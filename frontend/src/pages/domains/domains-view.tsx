import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/domains/domainsSlice';
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

const DomainsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { domains } = useAppSelector((state) => state.domains);

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
        <title>{getPageTitle('View domains')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View domains')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{domains?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>URL</p>
            <p>{domains?.url}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Registrar</p>
            <p>{domains?.registrar}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Price</p>
            <p>{domains?.price || 'No data'}</p>
          </div>

          <FormField label='RegistrationDate'>
            {domains.registration_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  domains.registration_date
                    ? new Date(
                        dayjs(domains.registration_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No RegistrationDate</p>
            )}
          </FormField>

          <FormField label='RenewalDate'>
            {domains.renewal_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  domains.renewal_date
                    ? new Date(
                        dayjs(domains.renewal_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No RenewalDate</p>
            )}
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={domains?.name_servers}
            />
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={domains?.dns_records}
            />
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={domains?.admin_credentials}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>asset_farm</p>

            <p>{domains?.asset_farm?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Apis Domain</p>
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
                    {domains.apis_domain &&
                      Array.isArray(domains.apis_domain) &&
                      domains.apis_domain.map((item: any) => (
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
              {!domains?.apis_domain?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Hostings Domain</p>
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
                    {domains.hostings_domain &&
                      Array.isArray(domains.hostings_domain) &&
                      domains.hostings_domain.map((item: any) => (
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
              {!domains?.hostings_domain?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Websites Domain</p>
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
                    {domains.websites_domain &&
                      Array.isArray(domains.websites_domain) &&
                      domains.websites_domain.map((item: any) => (
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
              {!domains?.websites_domain?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Subdomains Domain</p>
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
                    {domains.subdomains_domain &&
                      Array.isArray(domains.subdomains_domain) &&
                      domains.subdomains_domain.map((item: any) => (
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
              {!domains?.subdomains_domain?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/domains/domains-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

DomainsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DOMAINS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DomainsView;
