import { map } from 'lodash';
import { columnsDefinitions } from '../models/certificate.model';
export function getPayloadWithApprovalName(eventPayload, approvalName) {
  let payload = eventPayload ? { ...eventPayload } : null;
  if (payload) {
    const dataValues = map(payload.dataValues || [], (dataValue) => {
      if (dataValue && dataValue.dataElement) {
        if (
          dataValue.dataElement === columnsDefinitions.TEST_RESULT_APPROVAL_NAME
        ) {
          return approvalName ? { ...dataValue, value: approvalName } : '';
        }
      }
      return dataValue;
    });
    payload = { ...payload, dataValues };
  }
  return payload;
}
