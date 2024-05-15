import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ITOcustomerRequirementService } from '../ito-customer-requirement/ito-customer-requirement.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ITOturbineConfigService } from '../ito-turbine-config/ito-turbine-config.service';
import { ITOScopeOfSupplyService } from '../ito-scope-of-supply/ito-scope-of-supply.service';
import { BootstrapOptions } from '@angular/core/src/application_ref';
import { ITOcompleteTurbineService } from '../complete-turbine-details/complete-turbine-details.service';

@Component({
  selector: 'app-electrical',
  templateUrl: './electrical.component.html',
  styleUrls: ['./electrical.component.css']
})

export class ElectricalComponent implements OnInit {

  f2fAddOnCostFlag: boolean= false;
  f2fAddOnList:Array<any>=[];
  totalF2fAddOnCost:any=0;
  lubeAndControl: any = 0;
  highSpeedCoupling: any = 0;
  motorised: any = 0;
  stepDownGearBox: any = 0;
  steamTurbineModel: any = 0;
  scopeofsupp: string = 'scopeOfsup';
  Selscopeofsupp: string = 'selScopeOfsup';
  Subscription: Subscription;
  f2fList: Array<any> = [];
  counter: any;
  f2f: any;
  otherCostsOneLine: any;
  resp: any;
  F2Ftotal: any = 0;
  total: any = 0;
  RawMaterial: any = 0;
  overheadCost: any = 0;
  semiFinished: any = 0;
  UBO: any = 0;
  subContrCost: any = 0;
  shopCoverCost: any = 0;
  quotationNumber: any = '';
  addonCost: any = 0;

  defaultAddOns: Array<any> = [];
  addons: Array<any> = [];
  disbaleBoolean: Array<boolean> = [];
  dboEleList: Array<any> = [];
  dboEleAuxList: Array<any> = [];
  dboEleExtList1: Array<any> =[];
  dboCIList: Array<any> = [];
  dboCIAuxList: Array<any> = [];
  dboCIExtList: Array<any> =[];
  dboMechList: Array<any> = [];
  dboMechAuxList: Array<any> = [];
  dboMechExtList: Array<any> = [];
  dboMechExtCost: any = 0;
  dboMechAuxCost: any = 0;
  totalMechCost: any = 0;
  dboMechCost: any = 0;
  totalDboEleCost: any = 0;
  dboEleCost: any = 0;
  dboEleAuxCost: any = 0;
  dboEleExtCost: any = 0;
  cIExtCost: any = 0;
  cICost: any = 0;
  cIAuxCost: any = 0;
  totalDboCiCost: any = 0;
  estimateCostLocal: Array<any> = [];
  selectedScopes: Array<any> = [];
  disableArray: Array<boolean> = [];
  costSheetList: Array<any> = [];
  turbineMaterialCost: any = 0;
  totalF2FCost: any = 0;
  turbineInstrumentCost: any = 0;
  openUbo: boolean = false;
  varCostFlag: boolean = false;
  sparesFlag: boolean = false;
  projectCostFlag: boolean = false;
  typOff: string;

  constructor(private _Router: Router, private _ITOcustomerRequirementService: ITOcustomerRequirementService,
    private _ITOScopeOfSupplyService: ITOScopeOfSupplyService, private domSanitizer: DomSanitizer, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _ITOturbineConfigService: ITOturbineConfigService, private _ITOcompleteTurbineService: ITOcompleteTurbineService) {

      this.typOff = this._ITOcustomerRequirementService.saveBasicDet.typeOfQuotNm;        
    this._ITOcustomerRequirementService.getMessage().subscribe(qnum => {
      console.log(qnum);
      this.quotationNumber = qnum.qnum;
      console.log(this.quotationNumber);

    });
    // this.quotationNumber=this._ITOcustomerRequirementService.saveBasicDet.quotNumber;
    this.Subscription = this._ITOturbineConfigService.getMessage().subscribe(res => {
      console.log(res);
      this.resp = res;
      this.shopCoverCost = Number(res.onLine.shopCoverCost).toLocaleString('en-IN');
      this.totalF2FCost = Number(res.onLine.totalF2FCost).toLocaleString('en-IN');
      this.turbineMaterialCost = Number(res.onLine.turbineMaterialCost).toLocaleString('en-IN');
      this.subContrCost = Number(res.onLine.subContrCost).toLocaleString('en-IN'); 
      this.f2fList = res.onLine.f2fList;
      this.total = Number(res.onLine.total).toLocaleString('en-IN');
      this.addons = res.onLine.addOnsList;
      console.log(res.addOnsList);
      this.addonCost = Number(res.onLine.addonCost).toLocaleString('en-IN');
      this.costSheetList = res.onLine.costSheetList;
      this.dboMechList = res.onLine.dboMechList;
      this.dboMechAuxList = res.onLine.dboMechAuxList;
      this.dboMechExtList = res.onLine.dboMechExtList;
      this.dboEleList = res.onLine.dboEleList;
      this.dboEleAuxList = res.onLine.dboEleAuxList;
      this.dboEleExtList1 = res.onLine.dboEleExtList1;
      this.dboCIList = res.onLine.dboCIList;
      this.dboCIAuxList = res.onLine.dboCIAuxList;
      this.dboCIExtList = res.onLine.dboCIExtList;
      this.totalMechCost = Number(res.onLine.totalMechCost).toLocaleString('en-IN');
      this.dboMechCost = Number(res.onLine.dboMechCost).toLocaleString('en-IN');
      this.dboMechAuxCost = Number(res.onLine.dboMechAuxCost).toLocaleString('en-IN');
      this.dboMechExtCost = Number(res.onLine.dboMechExtCost).toLocaleString('en-IN');
      this.totalDboEleCost = Number(res.onLine.totalDboEleCost).toLocaleString('en-IN');
      this.dboEleCost = Number(res.onLine.dboEleCost).toLocaleString('en-IN');
      this.dboEleAuxCost = Number(res.onLine.dboEleAuxCost).toLocaleString('en-IN');
      this.dboEleExtCost = Number(res.onLine.dboEleExtCost).toLocaleString('en-IN');
      this.cICost = Number(res.onLine.cICost).toLocaleString('en-IN');
      this.totalDboCiCost = Number(res.onLine.totalDboCiCost).toLocaleString('en-IN');
      this.cIAuxCost = Number(res.onLine.cIAuxCost).toLocaleString('en-IN');
      this.cIExtCost = Number(res.onLine.cIExtCost).toLocaleString('en-IN');
      this.varCostFlag=res.onLine.varCostFlag;
      this.sparesFlag=res.onLine.sparesFlag;
      this.projectCostFlag=res.onLine.projectCostFlag;
      this.otherCostsOneLine= res.onLine.otherCostsBean;
      this.f2fAddOnCostFlag=res.onLine.f2fAddOnCostFlag;
      this.f2fAddOnList=res.onLine.f2fAddOnList;
      this.totalF2fAddOnCost=Number(res.onLine.totalF2fAddOnCost).toLocaleString('en-IN');
      console.log(res.onLine.costSheetList);
      for(let g=0; g<this.dboCIExtList.length; g++){
        if(this.dboCIExtList[g].price >0){
        this.dboCIExtList[g].price= Number(this.dboCIExtList[g].price).toLocaleString('en-IN')
      }
    }
      for(let l=0;l<this.dboCIAuxList.length;l++){
        if(this.dboCIAuxList[l].price>0){
        this.dboCIAuxList[l].price= Number(this.dboCIAuxList[l].price).toLocaleString('en-IN')
      }
    }
      for(let a=0;a<this.dboCIList.length;a++){
        if(this.dboCIList[a].price > 0){
        this.dboCIList[a].price= Number(this.dboCIList[a].price).toLocaleString('en-IN')
      }
    }
      for(let b=0; b<this.dboEleExtList1.length;b++){
        if(this.dboEleExtList1[b].price>0){
        this.dboEleExtList1[b].price=Number(this.dboEleExtList1[b].price).toLocaleString('en-IN')
      }
    }
      for(let c=0;c<this.dboEleAuxList.length;c++){
        if(this.dboEleAuxList[c].price > 0){
        this.dboEleAuxList[c].price=Number(this.dboEleAuxList[c].price).toLocaleString('en-IN')
      }
    }
      for(let d=0;d<this.dboEleList.length;d++){
        if(this.dboEleList[d].price > 0){
        this.dboEleList[d].price=Number(this.dboEleList[d].price).toLocaleString('en-IN');
      }
    }
      for(let e=0;e<this.dboMechExtList.length;e++){
        if(this.dboMechExtList[e].price > 0){
        this.dboMechExtList[e].price=Number(this.dboMechExtList[e].price).toLocaleString('en-IN');
      }
    }
      for(let f=0;f<this.dboMechAuxList.length; f++){
        if(this.dboMechAuxList[f].price >0){
        this.dboMechAuxList[f].price=Number(this.dboMechAuxList[f].price).toLocaleString('en-IN');
      }
    }
      for(let h=0; h<this.dboMechList.length; h++){
        if(this.dboMechList[h].price > 0){
        this.dboMechList[h].price=Number(this.dboMechList[h].price).toLocaleString('en-IN');
      }
    }
      for(let i=0; i<this.f2fAddOnList.length;i++){
        if(this.f2fAddOnList[i].price > 0){
        this.f2fAddOnList[i].price=Number(this.f2fAddOnList[i].price).toLocaleString('en-IN');
      }
    }
      for(let j=0;this.addons.length; j++){
        if(this.addons[j].selectedCost > 0){
        this.addons[j].selectedCost=Number(this.addons[j].selectedCost).toLocaleString('en-IN');
      }
    }
      for(let k=0;k<this.f2fList.length;k++){
        if(this.f2fList[k].price > 0){
        this.f2fList[k].price=Number(this.f2fList[k].price).toLocaleString('en-IN');
      }
    }
      for(let l=0;l<this.costSheetList.length;l++){
        if(this.costSheetList[l].price > 0){
        this.costSheetList[l].price= Number(this.costSheetList[l].price).toLocaleString('en-IN')
      }
    }
    if(this.otherCostsOneLine.turbineOrderBookCost > 0){
      this.otherCostsOneLine.turbineOrderBookCost=Number(this.otherCostsOneLine.turbineOrderBookCost).toLocaleString('en-IN');
    }
      if(this.otherCostsOneLine.percentProfit > 0){
      this.otherCostsOneLine.percentProfit=Number(this.otherCostsOneLine.percentProfit).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.totOrderCostNetProfit > 0){
      this.otherCostsOneLine.totOrderCostNetProfit=Number(this.otherCostsOneLine.totOrderCostNetProfit).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.sparesNetProfit > 0){
      this.otherCostsOneLine.sparesNetProfit=Number(this.otherCostsOneLine.sparesNetProfit).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.turbineSparesCost > 0){
      this.otherCostsOneLine.turbineSparesCost=Number(this.otherCostsOneLine.turbineSparesCost).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.orderBookingSpares > 0){
      this.otherCostsOneLine.orderBookingSpares=Number(this.otherCostsOneLine.orderBookingSpares).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.ldPerformance > 0){
      this.otherCostsOneLine.ldPerformance=Number(this.otherCostsOneLine.ldPerformance).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.totOrderCost > 0){
      this.otherCostsOneLine.totOrderCost=Number(this.otherCostsOneLine.totOrderCost).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.totalVariableCost > 0){
      this.otherCostsOneLine.totalVariableCost=Number(this.otherCostsOneLine.totalVariableCost).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.bankingCharges1 > 0){
      this.otherCostsOneLine.bankingCharges1=Number(this.otherCostsOneLine.bankingCharges1).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.contigencyGeneral > 0){
      this.otherCostsOneLine.contigencyGeneral=Number(this.otherCostsOneLine.contigencyGeneral).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.ldforLateDelivery > 0){
      this.otherCostsOneLine.ldforLateDelivery=Number(this.otherCostsOneLine.ldforLateDelivery).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.travelExpenses > 0){
      this.otherCostsOneLine.travelExpenses=Number(this.otherCostsOneLine.travelExpenses).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.ovrheadSparesCost > 0){
      this.otherCostsOneLine.ovrheadSparesCost=Number(this.otherCostsOneLine.ovrheadSparesCost).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.bankingCharges2 > 0){
      this.otherCostsOneLine.bankingCharges2=Number(this.otherCostsOneLine.bankingCharges2).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.intrestCharges > 0){
      this.otherCostsOneLine.intrestCharges=Number(this.otherCostsOneLine.intrestCharges).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.ovrheadSaleCost > 0){
      this.otherCostsOneLine.ovrheadSaleCost=Number(this.otherCostsOneLine.ovrheadSaleCost).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.warrantyCost > 0){
      this.otherCostsOneLine.warrantyCost=Number(this.otherCostsOneLine.warrantyCost).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.salesExpenses > 0){
      this.otherCostsOneLine.salesExpenses=Number(this.otherCostsOneLine.salesExpenses).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.insurance > 0){
      this.otherCostsOneLine.insurance=Number(this.otherCostsOneLine.insurance).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.turbineContigency > 0){
      this.otherCostsOneLine.turbineContigency=Number(this.otherCostsOneLine.turbineContigency).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.others > 0){
      this.otherCostsOneLine.others=Number(this.otherCostsOneLine.others).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.totalSparesCost > 0){
      this.otherCostsOneLine.totalSparesCost=Number(this.otherCostsOneLine.totalSparesCost).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.dboContigency > 0){
      this.otherCostsOneLine.dboContigency=Number(this.otherCostsOneLine.dboContigency).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.engineCharges > 0){
      this.otherCostsOneLine.engineCharges=Number(this.otherCostsOneLine.engineCharges).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.agencyCommCharges > 0){
      this.otherCostsOneLine.agencyCommCharges=Number(this.otherCostsOneLine.agencyCommCharges).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.overRawMaterialCost > 0){
      this.otherCostsOneLine.overRawMaterialCost=Number(this.otherCostsOneLine.overRawMaterialCost).toLocaleString('en-IN');
      }
      if(this.otherCostsOneLine.ovrheadTotSaleCost > 0){
      this.otherCostsOneLine.ovrheadTotSaleCost=Number(this.otherCostsOneLine.ovrheadTotSaleCost).toLocaleString('en-IN');
      }
    });
    //this._ITOcustomerRequirementService.sendbtnStatus(true, false, true, true, false, false, false);
    this.estimateCostLocal[this.scopeofsupp] = this.storage.get(this.scopeofsupp);
    if (this.estimateCostLocal[this.scopeofsupp] != null) {
      console.log(this.estimateCostLocal[this.scopeofsupp]);
      this.selectedScopes = this.estimateCostLocal[this.scopeofsupp];

      if (this.selectedScopes.length != 0) {
        for (let s = 0; s < this.selectedScopes.length; s++) {
          this.disableArray.push(this.selectedScopes[s]);
          this.disbaleBoolean.push(this.selectedScopes[s].defaultValue);
        }
      }
      console.log(this.disableArray);

    }
  }


  ngOnInit() {
    this._ITOcustomerRequirementService.sendMessage(this._ITOcustomerRequirementService.saveBasicDet.quotNumber);
    this._ITOturbineConfigService.getExcelCostSheetData(this._ITOcustomerRequirementService.saveBasicDet.quotId).subscribe(resOnline => {
      this._ITOturbineConfigService.sendMessage(resOnline.oneLineBomExcel);
    })
    this._ITOScopeOfSupplyService.getQuotationList().subscribe(sosRes => {
      console.log(sosRes);
    })
  }
  navigate(scope) {
    console.log(scope);
  }

  openUBO() {
    this._ITOcompleteTurbineService.openUBO();
    this.openUbo = this._ITOcompleteTurbineService.openUbo;
  }
}

