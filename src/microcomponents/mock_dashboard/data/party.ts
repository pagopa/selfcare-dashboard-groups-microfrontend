import { Party } from '../../../model/Party';

export const mockedParties: Array<Party> = [
  {
    userRole: 'ADMIN',
    description: 'Comune di Bari',
    urlLogo: 'image',
    status: 'PENDING',
    partyId: '1',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeBari',
    category: '',
  },
  {
    userRole: 'ADMIN',
    description: 'Comune di Milano',
    urlLogo: 'image',
    status: 'PENDING',
    partyId: '2',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeMilano',
    category: '',
  },
  {
    userRole: 'ADMIN',
    description: 'Comune di Roma',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '3',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeRoma',
    category: '',
  },
  {
    userRole: 'LIMITED',
    description: 'Comune di Napoli',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '4',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeNapoli',
    category: '',
  },
  {
    userRole: 'ADMIN',
    description: 'AGENCY ONBOARDED',
    urlLogo: 'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/onboarded/logo.png',
    status: 'ACTIVE',
    partyId: 'onboarded',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeONBOARDED',
    category: '',
  },
  // Usable when not mocking the BE
  {
    category: 'Comuni e loro Consorzi e Associazioni',
    description: 'Comune di Caltanissetta',
    digitalAddress: 'protocollo@pec.comune.caltanissetta.it',
    fiscalCode: '80001130857',
    partyId: 'c_b429',
    status: 'ACTIVE',
    urlLogo: 'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/c_b429/logo.png',
    userRole: 'ADMIN',
  },
  // Usable when not mocking the BE
  {
    category: 'Comuni e loro Consorzi e Associazioni',
    description: 'Comune di Casalnuovo di Napoli',
    digitalAddress: 'protocollogen.casalnuovo.na@pec.actalis.it',
    fiscalCode: '05600440639',
    partyId: 'c_b905',
    status: 'ACTIVE',
    urlLogo: 'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/c_b905/logo.png',
    userRole: 'ADMIN',
  },
];
