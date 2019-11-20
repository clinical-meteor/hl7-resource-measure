Package.describe({
  name: 'clinical:hl7-resource-encounter',
  version: '2.0.5',
  summary: 'HL7 FHIR Resource - Encounter',
  git: 'https://github.com/clinical-meteor/hl7-resource-encounter',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-base@1.4.0');
  api.use('mongo');

  api.use('aldeed:collection2@3.0.0');

  api.use('simple:json-routes@2.1.0');
  api.use('momentjs:moment@2.17.1');
  api.use('ecmascript@0.12.4');
  api.use('session');
  api.use('http'); 
  api.use('react-meteor-data@0.2.15');

  // api.use('clinical:hl7-resource-datatypes@4.0.0');
  // api.use('clinical:hl7-resource-bundle@1.5.5');

  // if(Package['clinical:fhir-vault-server']){
  //   api.use('clinical:fhir-vault-server@0.0.3', ['client', 'server'], {weak: true});
  // }

  // api.use('clinical:glass-ui@2.5.0');
  api.use('clinical:extended-api@2.5.0');
  // api.use('clinical:base-model@1.5.0');
  // api.use('clinical:user-model@1.7.0');
  api.use('matb33:collection-hooks@0.7.15');
  
  api.addFiles('lib/Encounters.js', ['client', 'server']);

  // api.addFiles('server/rest.js', 'server');
  // api.addFiles('server/initialize.js', 'server');

  api.export('Encounter');
  api.export('Encounters');
  api.export('EncounterSchema');

  api.mainModule('index.jsx', 'client');
});

Npm.depends({
  "simpl-schema": "1.5.3",
  "moment": "2.22.2",
  "validator": "10.9.0",
  "lodash": "4.17.4",
  "material-fhir-ui": "0.7.6",
  "react-icons": "3.8.0",
  "styled-components": "4.4.1"
});
