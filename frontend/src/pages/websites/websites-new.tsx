import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/websites/websitesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  url: '',

  host: '',

  site_credentials: '',

  monitoring_info: '',

  domain: '',

  asset_farm: '',
};

const WebsitesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/websites/websites-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='URL'>
                <Field name='url' placeholder='URL' />
              </FormField>

              <FormField label='Host'>
                <Field name='host' placeholder='Host' />
              </FormField>

              <FormField label='SiteCredentials' hasTextareaHeight>
                <Field
                  name='site_credentials'
                  as='textarea'
                  placeholder='SiteCredentials'
                />
              </FormField>

              <FormField label='MonitoringInfo' hasTextareaHeight>
                <Field
                  name='monitoring_info'
                  as='textarea'
                  placeholder='MonitoringInfo'
                />
              </FormField>

              <FormField label='Domain' labelFor='domain'>
                <Field
                  name='domain'
                  id='domain'
                  component={SelectField}
                  options={[]}
                  itemRef={'domains'}
                ></Field>
              </FormField>

              <FormField label='asset_farm' labelFor='asset_farm'>
                <Field
                  name='asset_farm'
                  id='asset_farm'
                  component={SelectField}
                  options={[]}
                  itemRef={'asset_farms'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/websites/websites-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

WebsitesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_WEBSITES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default WebsitesNew;
