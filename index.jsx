import React from 'react';

import MeasuresPage from './client/MeasuresPage';
import MeasuresTable from './client/MeasuresTable';
import MeasureDetail from './client/MeasureDetail';
import { Measure, Measures, MeasureSchema } from './lib/Measures';

import { FaHospitalAlt } from 'react-icons/fa';

var DynamicRoutes = [{
  'name': 'MeasuresPage',
  'path': '/measures',
  'component': MeasuresPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Measures',
  'to': '/measures',
  'href': '/measures',
  'icon': <FaHospitalAlt />
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  MeasuresPage,
  MeasuresTable,
  MeasureDetail
};


