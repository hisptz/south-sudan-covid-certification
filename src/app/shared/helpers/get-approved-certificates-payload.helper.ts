import { ApprovedCertificate } from 'src/app/store/models/approved-certificate.model';

import { uniq } from 'lodash';
import { CurrentUser } from 'src/app/store/models';
export function getApprovedCertificatePayload(
  approvedCertificates: Array<ApprovedCertificate>,
  enrollment: string,
  tei: string,
  ou: string,
  currentUser: CurrentUser
): Array<ApprovedCertificate> {
  let newApprovedCertificates: ApprovedCertificate[] = [];
  if (approvedCertificates) {
    newApprovedCertificates = approvedCertificates
  ? [...approvedCertificates]
  : [];
    const certificateObj: ApprovedCertificate = {
      enrollment,
      tei,
      ou,
      approvedBy:{ 
         id: currentUser && currentUser.id ? currentUser.id : '',
         name: currentUser && currentUser.name ? currentUser.name : '',
      },
      isPending: true
    };
    newApprovedCertificates.push(certificateObj);
    newApprovedCertificates = uniq(newApprovedCertificates);
  }
  return newApprovedCertificates;
}
