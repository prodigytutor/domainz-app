import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/domains/domainsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditDomains = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    url: '',

    registrar: '',

    price: '',

    registration_date: new Date(),

    renewal_date: new Date(),

    name_servers: '',

    dns_records: '',

    admin_credentials: '',

    asset_farm: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { domains } = useAppSelector((state) => state.domains);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { domainsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: domainsId }));
  }, [domainsId]);

  useEffect(() => {
    if (typeof domains === 'object') {
      setInitialValues(domains);
    }
  }, [domains]);

  useEffect(() => {
    if (typeof domains === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = domains[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [domains]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: domainsId, data }));
    await router.push('/domains/domains-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit domains')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit domains'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.registration_date
                      ? new Date(
                          dayjs(initialValues.registration_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      registration_date: date,
                    })
                  }
                />
              </FormField>

              <FormField label='RenewalDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.renewal_date
                      ? new Date(
                          dayjs(initialValues.renewal_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, renewal_date: date })
                  }
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
                  options={initialValues.asset_farm}
                  itemRef={'asset_farms'}
                  showField={'name'}
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

EditDomains.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DOMAINS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDomains;
