import { Grid, Link, Divider, Typography, Chip } from '@mui/material';
import { useHistory } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PartyGroupDetail, PartyGroupStatus } from '../../../model/PartyGroup';
import { Product } from '../../../model/Product';
import { Party, UserStatus } from '../../../model/Party';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../model/ProductRole';
import { PartyProductUser, PartyUserProduct } from '../../../model/PartyUser';
import { ENV } from '../../../utils/env';
import GroupMenu from './GroupMenu';

type Props = {
  partyGroup: PartyGroupDetail;
  product: Product;
  party: Party;
  isSuspended: boolean;
  productRolesLists: ProductRolesLists;
  canEdit: boolean;
  onGroupStatusUpdate: (nextGroupStatus: PartyGroupStatus) => void;
};

export default function MembersGroup({
  partyGroup,
  product,
  party,
  isSuspended,
  productRolesLists,
  canEdit,
  onGroupStatusUpdate,
}: Props) {
  const history = useHistory();

  const [members, setMembers] = useState<Array<PartyProductUser>>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setMembers(partyGroup.members);
  }, [partyGroup]);

  const onMemberDelete = (member: PartyProductUser) => {
    const nextMembers = members.filter((u) => u.id !== member.id);
    setMembers(nextMembers);
    onGroupStatusUpdate(partyGroup.status);
    // eslint-disable-next-line functional/immutable-data
    partyGroup.members = nextMembers;
  };

  const onMemberStatusUpdate = (
    member: PartyProductUser,
    userProduct: PartyUserProduct,
    nextStatus: UserStatus
  ) => {
    // eslint-disable-next-line functional/immutable-data
    member.status = nextStatus;
    // eslint-disable-next-line functional/immutable-data
    userProduct.roles[0].status = nextStatus;
    setMembers(members.slice());
  };

  return (
    <Grid container py={2}>
      {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
      {members.map((member, index) => {
        const userProduct = member.product;
        const isMemeberSuspended =
          member.status === 'SUSPENDED' ||
          !userProduct?.roles.find((r) => r.status !== 'SUSPENDED');

        return (
          <Grid key={member.id} item container spacing={1}>
            <Grid item xs={4}>
              <Link
                component="button"
                disabled={isSuspended}
                sx={{
                  width: '100%',
                  textDecoration: 'none',
                  fontWeight: 600,
                  cursor: isSuspended ? 'text' : 'pointer',
                  display: 'flex',
                }}
                onClick={() =>
                  history.push(
                    resolvePathVariables(ENV.ROUTES.USERS_DETAIL, {
                      institutionId: partyGroup.institutionId,
                      userId: member.id,
                    })
                  )
                }
              >
                <Typography
                  className="ShowDots"
                  sx={{
                    color: isSuspended ? '#a2adb8' : '#0073E6',
                    fontWeight: 600,
                    justifyContent: 'flexStart',
                  }}
                  title={`${member.name} ${member.surname}`}
                >
                  {`${member.name} ${member.surname}${
                    member.isCurrentUser ? t('membersGroup.currentUser') : ''
                  }`}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Typography
                className="ShowDots"
                color={isMemeberSuspended || isSuspended ? '#9E9E9E' : undefined}
                title={member.email}
                width="100%"
              >
                {member.email}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {userProduct?.roles?.map((r, index) => (
                <Grid container key={index}>
                  <Grid item xs={isMemeberSuspended ? 8 : 12}>
                    <Typography
                      title={transcodeProductRole2Title(r.role, productRolesLists)}
                      className="ShowDots"
                      width={isMemeberSuspended ? '20ch' : '30ch'}
                      color={r.status === 'SUSPENDED' || isSuspended ? '#9E9E9E' : undefined}
                    >
                      {transcodeProductRole2Title(r.role, productRolesLists)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={2} display="flex" justifyContent="center">
              {isMemeberSuspended && (
                <Chip
                  label="Sospeso"
                  variant="outlined"
                  sx={{
                    fontWeight: '600',
                    fontSize: '14px',
                    background: '#E0E0E0',
                    border: 'none',
                    borderRadius: '16px',
                    width: '76px',
                    height: '24px',
                  }}
                />
              )}
            </Grid>

            <GroupMenu
              member={member}
              party={party}
              product={product}
              partyGroup={partyGroup}
              userProduct={userProduct}
              isSuspended={isSuspended}
              productRolesLists={productRolesLists}
              onMemberStatusUpdate={onMemberStatusUpdate}
              onMemberDelete={onMemberDelete}
              canEdit={canEdit}
            />
            {index !== partyGroup.members.length - 1 && (
              <Grid item xs={12} py={2}>
                <Divider />
              </Grid>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
