import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/websites/websitesSlice';
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

const WebsitesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { websites } = useAppSelector((state) => state.websites);

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
        <title>{getPageTitle('View websites')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View websites')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>URL</p>
            <p>{websites?.url}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Host</p>
            <p>{websites?.host}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={websites?.site_credentials}
            />
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={websites?.monitoring_info}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Domain</p>

            <p>{websites?.domain?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>asset_farm</p>

            <p>{websites?.asset_farm?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/websites/websites-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

WebsitesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_WEBSITES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default WebsitesView;
