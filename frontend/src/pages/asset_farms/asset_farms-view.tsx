import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/asset_farms/asset_farmsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const Asset_farmsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { asset_farms } = useAppSelector((state) => state.asset_farms);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View asset_farms')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View asset_farms')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{asset_farms?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Asset_farms</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asset_farms.users_asset_farm &&
                      Array.isArray(asset_farms.users_asset_farm) &&
                      asset_farms.users_asset_farm.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!asset_farms?.users_asset_farm?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Apis asset_farm</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>URL</th>

                      <th>Host</th>

                      <th>APICredentials</th>

                      <th>MonitoringInfo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asset_farms.apis_asset_farm &&
                      Array.isArray(asset_farms.apis_asset_farm) &&
                      asset_farms.apis_asset_farm.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/apis/apis-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='url'>{item.url}</td>

                          <td data-label='host'>{item.host}</td>

                          <td data-label='api_credentials'>
                            {item.api_credentials}
                          </td>

                          <td data-label='monitoring_info'>
                            {item.monitoring_info}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!asset_farms?.apis_asset_farm?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Domains asset_farm</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>URL</th>

                      <th>Registrar</th>

                      <th>Price</th>

                      <th>RegistrationDate</th>

                      <th>RenewalDate</th>

                      <th>NameServers</th>

                      <th>DNSRecords</th>

                      <th>AdminCredentials</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asset_farms.domains_asset_farm &&
                      Array.isArray(asset_farms.domains_asset_farm) &&
                      asset_farms.domains_asset_farm.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/domains/domains-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='url'>{item.url}</td>

                          <td data-label='registrar'>{item.registrar}</td>

                          <td data-label='price'>{item.price}</td>

                          <td data-label='registration_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.registration_date,
                            )}
                          </td>

                          <td data-label='renewal_date'>
                            {dataFormatter.dateTimeFormatter(item.renewal_date)}
                          </td>

                          <td data-label='name_servers'>{item.name_servers}</td>

                          <td data-label='dns_records'>{item.dns_records}</td>

                          <td data-label='admin_credentials'>
                            {item.admin_credentials}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!asset_farms?.domains_asset_farm?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Hostings asset_farm</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Provider</th>

                      <th>AccountCredentials</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asset_farms.hostings_asset_farm &&
                      Array.isArray(asset_farms.hostings_asset_farm) &&
                      asset_farms.hostings_asset_farm.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/hostings/hostings-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='provider'>{item.provider}</td>

                          <td data-label='account_credentials'>
                            {item.account_credentials}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!asset_farms?.hostings_asset_farm?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Websites asset_farm</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>URL</th>

                      <th>Host</th>

                      <th>SiteCredentials</th>

                      <th>MonitoringInfo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asset_farms.websites_asset_farm &&
                      Array.isArray(asset_farms.websites_asset_farm) &&
                      asset_farms.websites_asset_farm.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/websites/websites-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='url'>{item.url}</td>

                          <td data-label='host'>{item.host}</td>

                          <td data-label='site_credentials'>
                            {item.site_credentials}
                          </td>

                          <td data-label='monitoring_info'>
                            {item.monitoring_info}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!asset_farms?.websites_asset_farm?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Subdomains asset_farm</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>URL</th>

                      <th>Host</th>

                      <th>SiteCredentials</th>

                      <th>MonitoringInfo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asset_farms.subdomains_asset_farm &&
                      Array.isArray(asset_farms.subdomains_asset_farm) &&
                      asset_farms.subdomains_asset_farm.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/subdomains/subdomains-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='url'>{item.url}</td>

                          <td data-label='host'>{item.host}</td>

                          <td data-label='site_credentials'>
                            {item.site_credentials}
                          </td>

                          <td data-label='monitoring_info'>
                            {item.monitoring_info}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!asset_farms?.subdomains_asset_farm?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/asset_farms/asset_farms-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Asset_farmsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ASSET_FARMS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Asset_farmsView;
