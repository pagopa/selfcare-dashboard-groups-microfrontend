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
    externalId: 'externalId1',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'PA',
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
    externalId: 'externalId2',
    originId: 'originId2',
    origin: 'IPA',
    institutionType: 'PA',
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
    externalId: 'externalId3',
    originId: 'originId3',
    origin: 'IPA',
    institutionType: 'PA',
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
    externalId: 'externalId4',
    originId: 'originId4',
    origin: 'IPA',
    institutionType: 'PA',
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
    externalId: 'externalId5',
    originId: 'originId5',
    origin: 'MOCK',
    institutionType: 'GSP',
  },
  // Usable when not mocking the BE
  {
    partyId: 'f572bb09-b689-4785-8ea8-4c7a8b081998',
    externalId: '00856930102',
    originId: 'c_d969',
    origin: 'IPA',
    institutionType: 'PA',
    description: 'Comune di Genova',
    category: 'Comuni e loro Consorzi e Associazioni',
    fiscalCode: '00856930102',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    digitalAddress: 'comunegenova@postemailcertificata.it',
    urlLogo:
      'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/f572bb09-b689-4785-8ea8-4c7a8b081998/logo.png',
  },
  // Usable when not mocking the BE
  {
    partyId: '7784b9d3-e834-4342-a6ef-d0566b058af2',
    externalId: '00441340122',
    originId: 'c_l682',
    origin: 'IPA',
    institutionType: 'PA',
    description: 'Comune di Varese',
    category: 'Comuni e loro Consorzi e Associazioni',
    fiscalCode: '00441340122',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    digitalAddress: 'protocollo@comune.varese.legalmail.it',
    urlLogo:
      'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/7784b9d3-e834-4342-a6ef-d0566b058af2/logo.png',
  },
];
