import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';

import CustomButtons from 'components/CustomButtons/Button';

import { useFetchPoolsInfo } from '../../redux/hooks';
import StyledTableCell from '../StyledTableCell/StyledTableCell';

import styles from './styles';

const useStyles = makeStyles(styles);

export default function StakePools(props) {
  const { fromPage } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const { pools, poolsInfo, fetchPoolsInfo } = useFetchPoolsInfo();

  useEffect(() => {
    fetchPoolsInfo();
  }, [fetchPoolsInfo]);

  return (
    <>
      <div className={classes.mainTitle}>{t('Stake-Main-Title')}</div>
      <h3 className={classes.secondTitle}>{t('Stake-Second-Title')}</h3>
      {fromPage === 'page' && (
        <Hidden xsDown>
          <div className={classes.listHeader}>
            <div className={classes.mainTitle}>{t('Stake-List-Header-Main')}</div>
            <div className={classNames(classes.flexBox, classes.marginTop)}>
              <div className={classes.secondTitle}>{t('Stake-List-Header-Sub')}</div>
              <CustomButtons
                href={t('Stake-Pools-Learn-More')}
                target="_blank"
                className={classes.learnMoreButton}
              >
                {t('Stake-Learn-More')}
              </CustomButtons>
            </div>
          </div>
        </Hidden>
      )}
      <Hidden xsDown>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{t('Stake-Table-Pool')}</StyledTableCell>
              <StyledTableCell>{t('Stake-Table-Staked')}</StyledTableCell>
              <StyledTableCell>{t('Stake-Table-Total')}</StyledTableCell>
              <StyledTableCell>{t('Stake-Table-Apy')}</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody classes={{
            root: classes.tableBodyRoot
          }}>
            {pools.map((pool, index) => (
              <TableRow key={pool.name}>
                <StyledTableCell>
                  <div className={classes.firstCell}>
                    <div className={classes.avatarContainer}>
                      <Avatar
                        alt={pool.name}
                        src={require(`../../../../images/${pool.name}-logo.png`)}
                        className={classes.avatar}
                      />
                    </div>
                    <div className={classes.firstCellContent}>
                      <div>{pool.name}</div>
                      <div>{pool.token}</div>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>{poolsInfo[index].staked}</StyledTableCell>
                <StyledTableCell>{poolsInfo[index].tvl}</StyledTableCell>
                <StyledTableCell>{poolsInfo[index].apy}</StyledTableCell>
                <StyledTableCell>
                  <CustomButtons
                    href={`/#/stake/pool/${index + 1}`}
                    className={classes.stakeButton}
                  >
                    {t('Stake-Button-Stake')}
                  </CustomButtons>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Hidden>
      <Hidden smUp>
        {pools.map((pool, index) => (
          <div key={`mobile-${index}`} className={classes.mobileContainer}>
            <div className={classNames(classes.avatarContainer, classes.mobileAvatarContainer)}>
              <Avatar
                alt={pool.name}
                src={require(`../../../../images/${pool.name}-logo.png`)}
                className={classes.mobileAvatar}
              />
            </div>
            <div className={classes.mobileHead}>
              <div style={{ fontSize: '26px', lineHeight: '18px', fontWeight: '600', marginBottom: '14px' }}>{pool.name}</div>
              <div style={{ fontSize: '18px', lineHeight: '14px', fontWeight: '500' }}>{pool.token}</div>
            </div>
            <div className={classes.mobileDetail}>
              <div style={{ marginBottom: '10px' }}>{t('Stake-Table-Apy')}: {poolsInfo[index].apy}</div>
              <div style={{ marginBottom: '10px' }}>{t('Stake-Table-Staked')}: {poolsInfo[index].staked}</div>
              <div style={{ marginBottom: '12px' }}>{t('Stake-Table-Total')}: {poolsInfo[index].tvl}</div>
            </div>
            <CustomButtons
              href={`/#/stake/pool/${index + 1}`}
              className={classNames(classes.stakeButton, classes.mobileStakeButton)}
            >
              {t('Stake-Button-Stake')}
            </CustomButtons>
          </div>
        ))}
      </Hidden>
    </>
  )
}

StakePools.defaultProps = {
  fromPage:'page',
}
