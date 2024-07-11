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

import { update, fetch } from '../../stores/apis/apisSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditApis = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    url: '',

    host: '',

    api_credentials: '',

    monitoring_info: '',

    domain: '',

    asset_farm: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { apis } = useAppSelector((state) => state.apis);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { apisId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: apisId }));
  }, [apisId]);

  useEffect(() => {
    if (typeof apis === 'object') {
      setInitialValues(apis);
    }
  }, [apis]);

  useEffect(() => {
    if (typeof apis === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = apis[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [apis]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: apisId, data }));
    await router.push('/apis/apis-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit apis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit apis'}
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

              <FormField label='APICredentials' hasTextareaHeight>
                <Field
                  name='api_credentials'
                  as='textarea'
                  placeholder='APICredentials'
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
                  onClick={() => router.push('/apis/apis-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditApis.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_APIS'}>{page}</LayoutAuthenticated>
  );
};

export default EditApis;
