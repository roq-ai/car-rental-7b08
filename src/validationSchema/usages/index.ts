import * as yup from 'yup';

export const usageValidationSchema = yup.object().shape({
  date: yup.date().required(),
  usage_time: yup.number().integer().required(),
  vehicle_id: yup.string().nullable(),
});
