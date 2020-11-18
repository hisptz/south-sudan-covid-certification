import { CertificateApprovalEffects } from './certificate-approval.effects';
import { ConfigEffects } from './config.effects';
import { CurrentUserEffects } from './current-user.effects';
import { PageStateEffects } from './page-state.effects';
import { RouterEffects } from './router.effects';

export const effects: any[] = [
    CurrentUserEffects, PageStateEffects,
    RouterEffects, CertificateApprovalEffects, ConfigEffects
];
