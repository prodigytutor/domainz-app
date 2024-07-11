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

import { create } from '../../stores/domains/domainsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  name: '',

  url: '',

  registrar: '',

  price: '',

  registration_date: '',

  renewal_date: '',

  name_servers: '',

  dns_records: '',

  admin_credentials: '',

  asset_farm: '',
};

const DomainsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/domains/domains-list');
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
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='URL'>
                <Field name='url' placeholder='URL' />
              </FormField>

              <FormField label='Registrar'>
                <Field name='registrar' placeholder='Registrar' />
              </FormField>

              <FormField label='Price'>
                <Field type='number' name='price' placeholder='Price' />
              </FormField>

              <FormField label='RegistrationDate'>
                <Field
                  type='datetime-local'
                  name='registration_date'
                  placeholder='RegistrationDate'
                />
              </FormField>

              <FormField label='RenewalDate'>
                <Field
                  type='datetime-local'
                  name='renewal_date'
                  placeholder='RenewalDate'
                />
              </FormField>

              <FormField label='NameServers' hasTextareaHeight>
                <Field
                  name='name_servers'
                  as='textarea'
                  placeholder='NameServers'
                />
              </FormField>

              <FormField label='DNSRecords' hasTextareaHeight>
                <Field
                  name='dns_records'
                  as='textarea'
                  placeholder='DNSRecords'
                />
              </FormField>

              <FormField label='AdminCredentials' hasTextareaHeight>
                <Field
                  name='admin_credentials'
                  as='textarea'
                  placeholder='AdminCredentials'
                />
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
                  onClick={() => router.push('/domains/domains-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

DomainsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_DOMAINS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DomainsNew;
