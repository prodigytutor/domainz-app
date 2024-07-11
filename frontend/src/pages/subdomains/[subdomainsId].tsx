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

import { update, fetch } from '../../stores/subdomains/subdomainsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditSubdomains = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    url: '',

    host: '',

    site_credentials: '',

    monitoring_info: '',

    domain: '',

    asset_farm: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { subdomains } = useAppSelector((state) => state.subdomains);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { subdomainsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: subdomainsId }));
  }, [subdomainsId]);

  useEffect(() => {
    if (typeof subdomains === 'object') {
      setInitialValues(subdomains);
    }
  }, [subdomains]);

  useEffect(() => {
    if (typeof subdomains === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = subdomains[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [subdomains]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: subdomainsId, data }));
    await router.push('/subdomains/subdomains-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit subdomains')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit subdomains'}
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
                  options={initialValues.domain}
                  itemRef={'domains'}
                  showField={'name'}
                ></Field>
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
                  onClick={() => router.push('/subdomains/subdomains-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditSubdomains.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SUBDOMAINS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditSubdomains;
