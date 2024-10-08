import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useGroupDetail } from '../hooks/useGroupDetail';
import { Party } from '../model/Party';
import { PartyGroupDetail } from '../model/PartyGroup';
import { ProductsMap } from '../model/Product';
import { DASHBOARD_GROUPS_ROUTES } from '../routes';
import { ENV } from '../utils/env';

export type withGroupDetailProps = {
  partyGroup: PartyGroupDetail;
  party: Party;
  productsMap: ProductsMap;
};

type GroupUrlParams = {
  partyId: string;
  groupId: string;
};

export default function withGroupDetail<T extends withGroupDetailProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, 'partyGroup' | 'fetchPartyGroup'>> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const ComponentWithGroupDetail = (props: T) => {
    const { partyId, groupId } = useParams<GroupUrlParams>();
    const fetchGroupDetail = useGroupDetail();
    const [partyGroup, setPartyGroup] = useState<PartyGroupDetail | null>();
    const addError = useErrorDispatcher();
    const history = useHistory();
    const { getAllProductsWithPermission } = usePermissions();
    const canSeeGroups = getAllProductsWithPermission(Actions.ManageProductGroups).length > 0;

    const doFetch = () => {
      fetchGroupDetail(partyId, groupId, props.productsMap)
        .then((group) => {
          if (group === null) {
            const goBackUrl = resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.path, {
              partyId,
            });

            addError({
              id: 'INVALID_PARTY_GROUP_ID_' + groupId + '__' + partyId,
              blocking: false,
              techDescription: `Selected an invalid group Id ${groupId} and/or institution id ${partyId}`,
              toNotify: false,
              error: new Error('INVALID_PARTY_GROUP_ID_INSTITUTION_ID'),
              onClose: () => history.push(goBackUrl),
              displayableDescription: 'Impossibile trovare il gruppo selezionato',
            });
          }
          if (group) {
            const sortedMembers = group.members
              ? [...group.members].sort((a, b) => a.name.localeCompare(b.name))
              : [];

            // Update group with sorted members
            setPartyGroup({
              ...group,
              members: sortedMembers,
            });
          }
        })
        .catch((reason) => {
          addError({
            id: uniqueId(`${ComponentWithGroupDetail.displayName}-`),
            blocking: false,
            error: reason,
            techDescription: `An error occurred while fetching group detail in component ${ComponentWithGroupDetail.displayName}`,
            onRetry: doFetch,
            toNotify: true,
          });
        });
    };

    useEffect(() => {
      if (!canSeeGroups) {
        history.push(resolvePathVariables(ENV.ROUTES.OVERVIEW, { partyId }));
      } else if (partyId && groupId) {
        doFetch();
      } else {
        throw new Error('Using withGroupDetail decorator under a path without partyId or groupId');
      }
    }, [partyId, groupId, canSeeGroups]);

    return partyGroup ? (
      <WrappedComponent {...props} partyGroup={partyGroup} fetchPartyGroup={doFetch} />
    ) : (
      <></>
    );
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentWithGroupDetail.displayName = `withGroupDetail(${displayName})`;

  return ComponentWithGroupDetail as React.ComponentType<Omit<T, 'partyGroup' | 'fetchPartyGroup'>>;
}
