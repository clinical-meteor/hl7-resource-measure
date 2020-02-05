import React from 'react';
import PropTypes from 'prop-types';

import { 
  CssBaseline,
  Grid, 
  Container,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Tab, 
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import TableNoData from 'material-fhir-ui';

import moment from 'moment-es6'
import _ from 'lodash';
let get = _.get;
let set = _.set;

import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';

import { ThemeProvider, makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  button: {
    background: theme.background,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: theme.buttonText,
    height: 48,
    padding: '0 30px',
  }
}));

let styles = {
  hideOnPhone: {
    visibility: 'visible',
    display: 'table'
  },
  cellHideOnPhone: {
    visibility: 'visible',
    display: 'table',
    paddingTop: '16px',
    maxWidth: '120px'
  },
  cell: {
    paddingTop: '16px'
  }
}


flattenMeasure = function(measure){
  let result = {
    _id: '',
    meta: '',
    title: '',
    description: '',
    identifier: ''
  };

  result._id =  get(measure, 'id') ? get(measure, 'id') : get(measure, '_id');
  result.id = get(measure, 'id', '');
  result.title = get(measure, 'title', '');
  result.description = get(measure, 'description', '');
  result.identifier = get(measure, 'identifier[0].value', '');

  return result;
}




function MeasuresTable(props){
  console.log('MeasuresTable.props', props);
  // console.log('MeasuresTable.props.measures', props.measures);

  const classes = useStyles();

  function handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }
  function displayOnMobile(width){
    let style = {};
    if(['iPhone'].includes(window.navigator.platform)){
      style.display = "none";
    }
    if(width){
      style.width = width;
    }
    return style;
  }
  function handleSelect(selected) {
    this.setState({selected});
  }
  function getDate(){
    return "YYYY/MM/DD";
  }
  function noChange(){
    return "";
  }
  function rowClick(id){
    Session.set("selectedMeasureId", id);
    Session.set('measurePageTabIndex', 1);
    Session.set('measureDetailState', false);
  }
  function renderActionIconsHeader(){
    if (!props.hideActionIcons) {
      return (
        <TableCell className='actionIcons' style={{width: '100px'}}>Actions</TableCell>
      );
    }
  }
  function renderActionIcons(measure ){
    if (!props.hideActionIcons) {
      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }

      return (
        <TableCell className='actionIcons' style={{minWidth: '120px'}}>
          <FaTags style={iconStyle} onClick={ onMetaClick.bind(measure)} />
          <GoTrashcan style={iconStyle} onClick={ removeRecord.bind(measure._id)} />  
        </TableCell>
      );
    }
  } 
  function removeRecord(_id){
    console.log('Remove measure ', _id)
    if(props.onRemoveRecord){
      props.onRemoveRecord(_id);
    }
  }
  function onActionButtonClick(id){
    if(typeof props.onActionButtonClick === "function"){
      props.onActionButtonClick(id);
    }
  }
  function cellClick(id){
    if(typeof props.onCellClick === "function"){
      props.onCellClick(id);
    }
  }

  function onMetaClick(patient){
    let self = this;
    if(props.onMetaClick){
      props.onMetaClick(self, patient);
    }
  }
  function renderBarcode(id){
    if (!props.renderBarcode) {
      return (
        <TableCell><span className="barcode helvetica">{id}</span></TableCell>
      );
    }
  }
  function renderBarcodeHeader(){
    if (!props.renderBarcode) {
      return (
        <TableCell>System ID</TableCell>
      );
    }
  }
  function renderIdentifier(id){
    if (!props.hideIdentifier) {
      return (
        <TableCell className='identifier'>{ id }</TableCell>
      );
    }
  }
  function renderIdentifierHeader(){
    if (!props.hideIdentifier) {
      return (
        <TableCell className='identifier'>Identifier</TableCell>
      );
    }
  }
  function renderStatus(valueString){
    if (!props.hideStatus) {
      return (
        <TableCell className='value'>{ valueString }</TableCell>
      );
    }
  }
  function renderStatusHeader(){
    if (!props.hideStatus) {
      return (
        <TableCell className='value'>Value</TableCell>
      );
    }
  }

  function renderHistory(valueString){
    if (!props.hideHistory) {
      return (
        <TableCell className='history'>{ valueString }</TableCell>
      );
    }
  }
  function renderHistoryHeader(){
    if (!props.hideHistory) {
      return (
        <TableCell className='history'>Value</TableCell>
      );
    }
  }

  function renderDescriptionHeader(){
    if (!props.hideDescription) {
      return (
        <TableCell className='description'>Description</TableCell>
      );
    }
  }
  function renderDescription(text){
    if (!props.hideDescription) {
      return (
        <TableCell className='description'>{ text }</TableCell>
      );  
    }
  }
  function renderTitleHeader(){
    if (!props.hideTitle) {
      return (
        <TableCell className='title'>Title</TableCell>
      );
    }
  }
  function renderTitle(text){
    if (!props.hideTitle) {
      return (
        <TableCell className='title'>{ text }</TableCell>
      );  
    }
  }
  function renderReasonCodeHeader(){
    if (!props.hideReasonCode) {
      return (
        <TableCell className='reasoncode'>ReasonCode</TableCell>
      );
    }
  }
  function renderReasonCode(code){
    if (!props.hideReasonCode) {
      return (
        <TableCell className='reasoncode'>{ code }</TableCell>
      );  
    }
  }
  function renderReasonHeader(){
    if (!props.hideReason) {
      return (
        <TableCell className='reason'>Reason</TableCell>
      );
    }
  }
  function renderReason(code){
    if (!props.hideReason) {
      return (
        <TableCell className='reason'>{ code }</TableCell>
      );  
    }
  }
  function renderCategoryHeader(){
    if (props.multiline === false) {
      return (
        <TableCell className='category'>Category</TableCell>
      );
    }
  }
  function renderCategory(category){
    if (props.multiline === false) {
      return (
        <TableCell className='category'>{ category }</TableCell>
      );
    }
  }
  function renderToggleHeader(){
    if (!props.hideCheckboxes) {
      return (
        <TableCell className="toggle" style={{width: '60px'}} >Toggle</TableCell>
      );
    }
  }
  function renderToggle(){
    if (!props.hideCheckboxes) {
      return (
        <TableCell className="toggle" style={{width: '60px'}}>
            {/* <Checkbox
              defaultChecked={true}
            /> */}
        </TableCell>
      );
    }
  }



  let tableRows = [];
  let measureToRender = [];
  if(props.measures){
    if(props.measures.length > 0){              
      props.measures.forEach(function(measure){
        measureToRender.push(flattenMeasure(measure));
      });  
    }
  }

  logger.debug('measureToRender', measureToRender);

  if(measureToRender.length === 0){
    logger.trace('MeasuresTable:  No measures to render.');
    // footer = <TableNoData noDataPadding={ props.noDataMessagePadding } />
  } else {
    for (var i = 0; i < measureToRender.length; i++) {
      if(props.multiline){
        tableRows.push(
          <TableRow className="measureRow" key={i} onClick={ rowClick(measureToRender[i]._id)} >
            { renderToggle() }
            { renderActionIcons(measureToRender[i]) }
            { renderIdentifier(measureToRender[i].identifier)}
            { renderTitle(measureToRender[i].title) }
            { renderDescription(measureToRender[i].description) }
            { renderBarcode(measureToRender[i]._id)}
          </TableRow>
        );    

      } else {
        tableRows.push(
          <TableRow className="measureRow" key={i} onClick={ rowClick.bind(measureToRender[i]._id)} >            
            { renderToggle() }
            { renderActionIcons(measureToRender[i]) }
            { renderIdentifier(measureToRender[i].identifier)}
            { renderTitle(measureToRender[i].title) }
            { renderDescription(measureToRender[i].description) }
            { renderBarcode(measureToRender[i]._id)}
          </TableRow>
        );    
      }
    }
  }

  return(
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          { renderToggleHeader() }
          { renderActionIconsHeader() }
          { renderIdentifierHeader() }
          { renderTitleHeader() }
          { renderDescriptionHeader() }
          { renderBarcodeHeader() }
        </TableRow>
      </TableHead>
      <TableBody>
        { tableRows }
      </TableBody>
    </Table>
  );
}

MeasuresTable.propTypes = {
  barcodes: PropTypes.bool,
  measures: PropTypes.array,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  hideIdentifier: PropTypes.bool,
  hideTitle: PropTypes.bool,
  hideDescription: PropTypes.bool,
  renderBarcode: PropTypes.bool,
  onCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onMetaClick: PropTypes.func,
  onRemoveRecord: PropTypes.func,
  onActionButtonClick: PropTypes.func,
  actionButtonLabel: PropTypes.string
};


export default MeasuresTable; 