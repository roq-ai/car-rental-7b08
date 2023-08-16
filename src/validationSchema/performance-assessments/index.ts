import * as yup from 'yup';

export const performanceAssessmentValidationSchema = yup.object().shape({
  assessment: yup.string().required(),
  vehicle_id: yup.string().nullable(),
});
