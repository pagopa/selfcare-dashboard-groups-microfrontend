import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { useEffect, useRef, useState } from 'react';
import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/lib/model/PageResource';
import { handleErrors } from '@pagopa/selfcare-common-frontend/lib/services/errorService';
import { fetchPartyGroups } from '../../../../services/groupsService';
import { PartyGroup, PartyGroupStatus } from '../../../../model/PartyGroup';
import { Product } from '../../../../model/Product';
import { Party } from '../../../../model/Party';
import { DASHBOARD_GROUPS_ROUTES } from '../../../../routes';
import GroupsProductTable from './components/GroupsProductTable';
import GroupsProductFetchError from './components/GroupsProductFetchError';

type Props = {
  party: Party;
  product: Product;
  currentUser: User;
  selected: boolean;
  incrementalLoad: boolean;
  initialPageSize: number;
  onFetchStatusUpdate: (isFetching: boolean, count: number, error: boolean) => void;
  onCompleteDelete: (product: Product) => void;
};

const GroupsTableProduct = ({
  party,
  product,
  currentUser,
  selected,
  incrementalLoad,
  initialPageSize,
  onFetchStatusUpdate,
  onCompleteDelete,
}: Props) => {
  const history = useHistory();

  const [groups, setGroups] = useState<PageResource<PartyGroup>>({
    content: [],
    page: { number: 0, size: 0, totalElements: 0, totalPages: 0 },
  });
  const [noMoreData, setNoMoreData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageRequest, setPageRequest] = useState<PageRequest>({ page: 0, size: initialPageSize });
  const [contentNumberElements, setContentNumberElements] = useState<number>(0);

  const previousInitialPageSize = useRef(initialPageSize);

  useEffect(() => {
    const requestPage = incrementalLoad ? 0 : selected ? 0 : pageRequest?.page ?? 0;
    const requestPageSize =
      previousInitialPageSize.current !== initialPageSize
        ? initialPageSize
        : pageRequest?.size ?? initialPageSize;
    // eslint-disable-next-line functional/immutable-data
    previousInitialPageSize.current = initialPageSize;
    setGroups({
      content: [],
      page: { number: requestPage, size: requestPageSize, totalElements: 0, totalPages: 0 },
    });
    setPageRequest({
      page: requestPage,
      size: requestPageSize,
    });
  }, [product, initialPageSize]);

  useEffect(() => {
    if (pageRequest) {
      fetchGroups();
    }
  }, [pageRequest]);

  const fetchGroups = () => {
    setLoading(true);
    fetchPartyGroups(party, product, currentUser, pageRequest)
      .then((r) => {
        const newContentNumberElements = contentNumberElements + r.content.length;
        const nextGroups =
          pageRequest?.page === 0 || !incrementalLoad
            ? r
            : { content: groups.content.concat(r.content), page: r.page };
        setGroups(nextGroups);
        setError(false);
        onFetchStatusUpdate(false, nextGroups.content.length, false);
        if (
          r.page.totalElements <= pageRequest.size ||
          r.page.totalElements === newContentNumberElements
        ) {
          setNoMoreData(true);
        } else {
          setNoMoreData(false);
          setContentNumberElements(newContentNumberElements);
        }
      })
      .catch((reason) => {
        handleErrors([
          {
            id: `FETCH_PARTY_GROUPS_${product.id}_ERROR`,
            blocking: false,
            error: reason,
            techDescription: `An error occurred while fetching party groups ${party.partyId} of product ${product.id}`,
            toNotify: true,
          },
        ]);
        setError(true);
        setGroups({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
        onFetchStatusUpdate(false, 1, true);
      })
      .finally(() => setLoading(false));
  };

  const onDelete = (partyGroup: PartyGroup) => {
    if (incrementalLoad) {
      setGroups({ ...groups, content: groups.content.filter((u) => u.id !== partyGroup.id) });
    } else {
      setPageRequest({ ...pageRequest });
    }
    if (groups.content.length === 1 && noMoreData) {
      onCompleteDelete(product);
    }
  };

  const onStatusUpdate = (partyGroup: PartyGroup, nextStatus: PartyGroupStatus) => {
    // eslint-disable-next-line functional/immutable-data
    partyGroup.status = nextStatus;
    setGroups({ page: groups.page, content: groups.content.slice() });
  };

  if (error && !loading) {
    return <GroupsProductFetchError onRetry={fetchGroups} />;
  } else {
    return !error && !loading && groups.content.length === 0 ? (
      <></>
    ) : (
      <GroupsProductTable
        loading={loading}
        incrementalLoad={incrementalLoad}
        noMoreData={noMoreData}
        party={party}
        product={product}
        groups={groups.content}
        onRowClick={(partyGroup) =>
          history.push(
            resolvePathVariables(
              DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_DETAIL.path,
              {
                groupId: partyGroup.id,
                partyId: partyGroup.partyId,
              }
            )
          )
        }
        page={groups.page}
        sort={pageRequest.sort}
        fetchPage={(page, size) =>
          setPageRequest({
            page: incrementalLoad ? pageRequest.page + 1 : page ?? 0,
            size: incrementalLoad ? pageRequest.size : size ?? pageRequest.size,
            sort: pageRequest.sort,
          })
        }
        onSortRequest={(sort) =>
          setPageRequest({
            page: incrementalLoad ? 0 : pageRequest.page,
            size: pageRequest.size,
            sort,
          })
        }
        onDelete={onDelete}
        onStatusUpdate={onStatusUpdate}
      />
    );
  }
};

export default GroupsTableProduct;
