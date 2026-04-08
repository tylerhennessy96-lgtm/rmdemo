// ── Windsor Communities / GID Seed Data ───────────────────

const STATES = ['All States', 'Texas', 'Florida', 'Georgia', 'North Carolina', 'Virginia', 'Arizona', 'Colorado'];

const METROS = {
  'All States': ['All Metros'],
  'Texas': ['All Metros', 'Dallas-Fort Worth', 'Houston', 'Austin', 'San Antonio'],
  'Florida': ['All Metros', 'Miami', 'Orlando', 'Tampa', 'Jacksonville'],
  'Georgia': ['All Metros', 'Atlanta'],
  'North Carolina': ['All Metros', 'Charlotte', 'Raleigh'],
  'Virginia': ['All Metros', 'Northern Virginia', 'Richmond'],
  'Arizona': ['All Metros', 'Phoenix', 'Scottsdale'],
  'Colorado': ['All Metros', 'Denver', 'Boulder'],
};

const COMMUNITIES = [
  { id: 'WCC-001', name: 'Windsor at Falcon Creek',    state: 'Texas', metro: 'Dallas-Fort Worth', rm: 'Sarah Mitchell',  cd: 'James Holbrook' },
  { id: 'WCC-002', name: 'Windsor Meadows',            state: 'Texas', metro: 'Dallas-Fort Worth', rm: 'Sarah Mitchell',  cd: 'James Holbrook' },
  { id: 'WCC-003', name: 'Windsor at Viridian',        state: 'Texas', metro: 'Dallas-Fort Worth', rm: 'Sarah Mitchell',  cd: 'Dana Cortez'    },
  { id: 'WCC-004', name: 'Windsor Lantana Hills',      state: 'Texas', metro: 'Austin',            rm: 'Tom Bridges',    cd: 'Dana Cortez'    },
  { id: 'WCC-005', name: 'Windsor at Waterview',       state: 'Texas', metro: 'Houston',           rm: 'Tom Bridges',    cd: 'Renee Park'     },
  { id: 'WCC-006', name: 'Windsor Plantation',         state: 'Georgia', metro: 'Atlanta',           rm: 'Priya Nair',     cd: 'Renee Park'     },
  { id: 'WCC-007', name: 'Windsor at Lake Pointe',     state: 'Florida', metro: 'Orlando',           rm: 'Priya Nair',     cd: 'Marcus Webb'    },
  { id: 'WCC-008', name: 'Windsor Boca Raton',         state: 'Florida', metro: 'Miami',             rm: 'Carlos Reyes',   cd: 'Marcus Webb'    },
  { id: 'WCC-009', name: 'Windsor at Westside',        state: 'North Carolina', metro: 'Charlotte',         rm: 'Carlos Reyes',   cd: 'Linda Foss'     },
  { id: 'WCC-010', name: 'Windsor Southpark',          state: 'North Carolina', metro: 'Charlotte',         rm: 'Carlos Reyes',   cd: 'Linda Foss'     },
  { id: 'WCC-011', name: 'Windsor at Dulles',          state: 'Virginia', metro: 'Northern Virginia', rm: 'Amy Chen',       cd: 'Steve Nguyen'   },
  { id: 'WCC-012', name: 'Windsor at Kingstowne',      state: 'Virginia', metro: 'Northern Virginia', rm: 'Amy Chen',       cd: 'Steve Nguyen'   },
];

const REVENUE_MANAGERS = ['All RMs', 'Sarah Mitchell', 'Tom Bridges', 'Priya Nair', 'Carlos Reyes', 'Amy Chen'];
const COMMUNITY_DIRECTORS = ['All CDs', 'James Holbrook', 'Dana Cortez', 'Renee Park', 'Marcus Webb', 'Linda Foss', 'Steve Nguyen'];

// Pricing table data — units per community
const UNIT_TYPES = ['1 Bed', '2 Bed', '3 Bed'];

const NOTE_TEXTS = [
  'Holding price pending comp survey',
  'Manager approved override',
  'Lease-up concession applied',
  'Do not discount',
  'High demand floor',
  'Seasonal rate adjustment',
  'Renewal retention pricing',
  'Below market — strategic hold',
  'Pending renovation premium',
  'Price matched to sister community',
];

function makeNote() {
  if (Math.random() > 0.4) return null;
  const text = NOTE_TEXTS[Math.floor(Math.random() * NOTE_TEXTS.length)];
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(Math.random() * 60) + 7);
  const expires = String(d.getMonth() + 1).padStart(2, '0') + '/' + String(d.getDate()).padStart(2, '0') + '/' + String(d.getFullYear()).slice(-2);
  return { text, expires };
}

function makeUnits(communityId, bedType, count, baseRent) {
  const moveOutDays = [10, 25, 40];
  const availDays = [18, 33, 48];
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    const status = i % 2 === 0 ? 'vacant' : 'on notice';
    const mo = new Date(); mo.setDate(mo.getDate() + (moveOutDays[i] || 30));
    const av = new Date(); av.setDate(av.getDate() + (availDays[i] || 40));
    const moveOut = String(mo.getMonth()+1).padStart(2,'0') + '/' + String(mo.getDate()).padStart(2,'0') + '/' + String(mo.getFullYear()).slice(-2);
    const availDate = String(av.getMonth()+1).padStart(2,'0') + '/' + String(av.getDate()).padStart(2,'0') + '/' + String(av.getFullYear()).slice(-2);
    const priorRent = baseRent - 80;
    const recRent = baseRent + 20;
    const alertPool = ['concession', 'comp', 'optimizer', 'manual'];
    const alerts = alertPool.filter(() => Math.random() > 0.65);
    return {
      id: `${communityId}-${bedType.replace(' ', '')}-${num}`,
      status,
      moveOut,
      availDate,
      priorRent,
      initialPrice: baseRent,
      priorPeriodPrice: baseRent - 40,
      recRent,
      deltaInitial: -2.2,
      deltaPrior: 1.1,
      lt: 12,
      attValue: 100,
      netEffRent: recRent,
      concsAmt: Math.random() < 0.6 ? [100,150,200,250,300][Math.floor(Math.random()*5)] : null,
      alerts,
      note: makeNote(),
      rcStatus: ['RC','AF','HA',null,null,null][Math.floor(Math.random()*6)],
    };
  });
}

function makeRandomAlerts() {
  const alertPool = ['concession', 'comp', 'optimizer', 'manual'];
  return alertPool.filter(() => Math.random() > 0.65);
}

const PRICING_DATA = COMMUNITIES.map(c => {
  const baseRents = { '1 Bed': 1800, '2 Bed': 2400, '3 Bed': 3100 };
  const totalUnits = Math.floor(Math.random() * 40) + 60;
  const avail = (Math.random() * 6 + 2).toFixed(1);
  return {
    ...c,
    totalUnits,
    availPct: avail,
    alerts: makeRandomAlerts(),
    bedTypes: UNIT_TYPES.map(bt => {
      const units = makeUnits(c.id, bt, 2, baseRents[bt]);
      return {
        type: bt,
        totalUnits: Math.floor(totalUnits / 3),
        availPct: (Math.random() * 6 + 2).toFixed(1),
        units,
        recRent: baseRents[bt] + 20,
        initialPrice: baseRents[bt],
        priorPeriodPrice: baseRents[bt] - 40,
        deltaInitial: -2.2,
        deltaPrior: 1.1,
        alerts: makeRandomAlerts(),
        concsAmt: null,
        note: null,
      };
    }),
  };
});

// Term availability (24 months × communities)
const TERM_DATA = COMMUNITIES.map(c => {
  const availability = Array.from({ length: 24 }, (_, i) => {
    // months 1-3 and 12 are commonly available, others random
    if (i < 3 || i === 11) return Math.random() > 0.2;
    return Math.random() > 0.35;
  });
  const premiums = availability.map(a => a ? (Math.random() > 0.5 ? 50 : 35) : null);
  return {
    ...c,
    availability,
    premiums,
    bedTypes: UNIT_TYPES.map(bt => ({
      type: bt,
      availability: Array.from({ length: 24 }, (_, i) => Math.random() > 0.3),
      premiums: Array.from({ length: 24 }, () => Math.random() > 0.5 ? 50 : 35),
    })),
  };
});

// Expiration data — 24 months per bed type per community
const EXPIRATION_DATA = COMMUNITIES.map(c => {
  const commPricing = PRICING_DATA.find(p => p.id === c.id);
  const totalUnits = commPricing?.totalUnits ?? 80;
  return {
    ...c,
    totalUnits,
    bedTypes: ['1 Bed', '2 Bed', '3 Bed'].map(bt => {
      const btUnits = Math.floor(totalUnits / 3);
      const baseRents = { '1 Bed': 1820, '2 Bed': 2420, '3 Bed': 3120 };
      const baseRent = baseRents[bt];
      const months = Array.from({ length: 24 }, (_, i) => {
        const date = new Date(2025, 3 + i, 1);
        const monthLabel = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        const recAbs = Math.max(1, Math.round(btUnits * (0.06 + Math.random() * 0.05)));
        const recRel = parseFloat((recAbs / btUnits * 100).toFixed(1));
        const forecastedAbs = Math.max(0, recAbs + Math.floor(Math.random() * 9) - 3);
        const forecastedRel = parseFloat((forecastedAbs / btUnits * 100).toFixed(1));
        const delta = forecastedAbs - recAbs;
        const rentForecast = Math.round(baseRent + (i * 6) + (Math.random() * 30 - 10));
        return { monthLabel, date, recAbs, recRel, forecastedAbs, forecastedRel, delta, rentForecast, manualPremium: null, recOverride: null };
      });
      return { type: bt, totalUnits: btUnits, months };
    }),
  };
});

// Parameters data
const PARAM_DEFAULTS = {
  maxPriceChange:10, minPriceChange:-10, unitGroup:'Individual',
  exposurePrio1:8, exposurePrio2:3, exposureMax:10, exposureMin:-45,
  compCorrMax:10, compCorrMin:-45, compCorrPrio1:30, compCorrPrio2:40,
  concessionTrigger:5, ltLower:12, ltUpper:24,
  modelHoldDays:0, modelPriceDown:-0.5, modelPriceUp:5, manualHoldDays:1,
  freeDaysOnNotice:2, freeDaysVacant:2, onNoticeMax:15, vacantMax:30,
  onNoticeRecovery:100, vacantRecovery:100,
  renewalLeadDays:90, relConcession:0, inheritBestPrice:false,
};

const PARAMETERS_DATA = COMMUNITIES.map(c => ({
  ...c,
  params: { ...PARAM_DEFAULTS },
  bedTypes: ['1 Bed','2 Bed','3 Bed'].map(bt => ({ type: bt, params: { ...PARAM_DEFAULTS } })),
}));

// Renewals data
const LEASE_TERMS = [6,9,10,11,12,13,14,15];

function makeRenewalUnits(commId, bedType, count, baseRent) {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i+1).padStart(3,'0');
    const leaseEndDays = Math.floor(Math.random()*180)+10;
    const le = new Date(2025,3,8); le.setDate(le.getDate()+leaseEndDays);
    const leaseEnd = (le.getMonth()+1).toString().padStart(2,'0')+'/'+le.getDate().toString().padStart(2,'0')+'/'+String(le.getFullYear()).slice(2);
    const daysToOffer = leaseEndDays - 90;
    const leaseTerm = LEASE_TERMS[Math.floor(Math.random()*LEASE_TERMS.length)];
    const leasePrice = baseRent + Math.floor(Math.random()*100-50);
    const concsAmt = Math.random()>0.6 ? [0,50,100,150,200][Math.floor(Math.random()*5)] : 0;
    const netEffLeasePrice = leasePrice - concsAmt;
    const renewalPricePct = parseFloat((Math.random()*6+1).toFixed(1));
    const renewalOfferPrice = Math.round(leasePrice*(1+renewalPricePct/100));
    const newLeasePrice = baseRent + 20;
    const deltaToNewLease = parseFloat(((renewalOfferPrice-newLeasePrice)/newLeasePrice*100).toFixed(1));
    const rcStatuses = ['RC','AF','HA',null,null,null,null];
    let status;
    if (daysToOffer > 0) { status = 'Pending'; }
    else {
      const openStatuses = ['Offer Sent','Offer Sent','Offer Sent','Accepted','Accepted','Declined','Negotiating','Pending'];
      status = openStatuses[Math.floor(Math.random()*openStatuses.length)];
    }
    return {
      id: commId+'-'+bedType.replace(' ','')+'-'+num,
      leaseId: 'LSE-'+commId.slice(-3)+'-'+num,
      bedType, rcStatus: rcStatuses[Math.floor(Math.random()*7)],
      leaseEnd, leaseEndDays, daysToOffer, leaseTerm, leasePrice, concsAmt, netEffLeasePrice,
      renewalOfferPrice, renewalOfferTerm: 12, renewalPricePct, deltaToNewLease, newLeasePrice,
      status,
      alerts: ['concession','comp','optimizer','manual'].filter(()=>Math.random()>0.7),
    };
  });
}

const RENEWALS_DATA = PRICING_DATA.map(comm => ({
  ...comm,
  bedTypes: comm.bedTypes.map(bt => ({
    ...bt,
    renewalUnits: makeRenewalUnits(comm.id, bt.type, Math.floor(Math.random()*4)+2, bt.recRent),
  })),
}));

// Concession Management — priority-based stacking
const CONCESSION_TYPE_OPTIONS=['Fixed Discount','Free Period','Waived Fee','Reduced Deposit','Gift Card','Percent Discount'];
const _fmtD=d=>(d.getMonth()+1).toString().padStart(2,'0')+'/'+d.getDate().toString().padStart(2,'0')+'/'+String(d.getFullYear()).slice(2);

function computeUnitConcessions(baseRent,concessions){const active=concessions.filter(c=>c.status==='Active').sort((a,b)=>a.priority-b.priority);if(!active.length)return{totalAmount:0,effectiveRent:baseRent,stackedList:[]};const ns=active.find(c=>!c.stackable);let applied=ns?active.filter(c=>c.priority<ns.priority||c.id===ns.id):active;const totalAmount=applied.reduce((s,c)=>{if(c.valueType==='relative')return s+Math.round(baseRent*c.value/100);if(c.valueType==='free_period')return s+Math.round(baseRent*c.value/12);return s+c.value;},0);return{totalAmount,effectiveRent:Math.max(0,baseRent-totalAmount),stackedList:applied};}

function generateConcessions(comm,bt,unitId,level){const baseRent=bt.recRent;const typeOpts={community:['Waived Fee','Reduced Deposit','Gift Card'],bedtype:['Fixed Discount','Free Period','Percent Discount','Waived Fee'],unit:['Fixed Discount','Free Period','Percent Discount','Waived Fee','Gift Card']};const prob={community:0.5,bedtype:0.55,unit:0.4};if(Math.random()>prob[level])return[];const count=level==='unit'?(Math.random()>0.7?2:1):(Math.random()>0.6?2:1);return Array.from({length:count},(_,i)=>{const type=typeOpts[level][Math.floor(Math.random()*typeOpts[level].length)];const valueType=type==='Free Period'?'free_period':type==='Percent Discount'?'relative':'absolute';const value=valueType==='relative'?Math.floor(Math.random()*8)+2:valueType==='free_period'?Math.floor(Math.random()*2)+1:[50,75,100,150,200,250,300][Math.floor(Math.random()*7)];const displayAmount=valueType==='relative'?Math.round(baseRent*value/100):valueType==='free_period'?Math.round(baseRent*value/12):value;const priority=i+1+(level==='community'?0:level==='bedtype'?2:4);const stackable=Math.random()>0.25;const dr=Math.floor(Math.random()*60)-5;const da=Math.floor(Math.random()*40)+5;const status=dr<0?'Expired':Math.random()>0.85?'Paused':'Active';const leaseType=level==='community'?'Both':Math.random()>0.5?'New Lease':'Renewal';const sd=new Date(2025,2,1);const ed=new Date(2025,3,8);ed.setDate(ed.getDate()+Math.max(0,dr));const lo=level!=='unit'?Math.floor(Math.random()*15)+3:null;const lt=lo?Math.floor(lo*(Math.random()*0.5+0.15)):null;return{id:'CONC-'+level.toUpperCase()+'-'+(unitId??bt.type)+'-'+comm.id+'-'+i,level,commId:comm.id,commName:comm.name,bedType:bt?.type??null,unitId:unitId??null,leaseType,type,value,valueType,displayAmount,priority,stackable,status,daysActive:da,daysRemaining:dr,startDate:_fmtD(sd),endDate:_fmtD(ed),excludeAffordable:Math.random()>0.7,excludeRC:Math.random()>0.6,leasesOfferedTo:lo,leasesTaken:lt,uptakeRate:lo&&lt?parseFloat((lt/lo*100).toFixed(1)):null,totalCost:lt?lt*displayAmount:null,taken:level==='unit'?Math.random()>0.5:null,daysVacant:level==='unit'?Math.floor(Math.random()*45)+5:null,daysToSign:level==='unit'&&Math.random()>0.5?Math.floor(Math.random()*20)+2:null};});}


const CONCESSIONS_DATA=PRICING_DATA.map(comm=>{
  const cc=generateConcessions(comm,{recRent:comm.bedTypes[0]?.recRent??1800},null,'community');
  const bedTypes=comm.bedTypes.map(bt=>{
    const bc=generateConcessions(comm,bt,null,'bedtype');
    const units=(bt.units||[]).map(unit=>{
      const uc=generateConcessions(comm,bt,unit.id,'unit');
      const allApp=[...cc,...bc,...uc].filter(c=>{if(c.excludeAffordable&&unit.rcStatus==='AF')return false;if(c.excludeRC&&unit.rcStatus==='RC')return false;return true;});
      const{totalAmount,effectiveRent,stackedList}=computeUnitConcessions(unit.recRent??bt.recRent,allApp);
      const concPct=unit.recRent?parseFloat((totalAmount/unit.recRent*100).toFixed(1)):0;
      return{...unit,baseRent:unit.recRent??bt.recRent,concessions:uc,allApplicableConcessions:allApp,stackedList,totalConcessionAmount:totalAmount,effectiveNetRent:effectiveRent,concPctOfRent:concPct,hasConcession:totalAmount>0,stackCount:stackedList.length,daysOnMarket:Math.floor(Math.random()*45)+5};
    });
    const uwc=units.filter(u=>u.hasConcession);
    const avgCA=uwc.length>0?Math.round(uwc.reduce((s,u)=>s+u.totalConcessionAmount,0)/uwc.length):0;
    const avgCP=uwc.length>0?parseFloat((uwc.reduce((s,u)=>s+u.concPctOfRent,0)/uwc.length).toFixed(1)):0;
    const avgNER=units.length>0?Math.round(units.reduce((s,u)=>s+u.effectiveNetRent,0)/units.length):0;
    const covPct=units.length>0?parseFloat((uwc.length/units.length*100).toFixed(1)):0;
    return{...bt,units,btConcessions:bc,coveragePct:covPct,unitsWithConc:uwc.length,avgConcAmt:avgCA,avgConcPct:avgCP,avgNetEffRent:avgNER};
  });
  const allU=bedTypes.flatMap(bt=>bt.units);const auwc=allU.filter(u=>u.hasConcession);
  const cCov=allU.length>0?parseFloat((auwc.length/allU.length*100).toFixed(1)):0;
  const cAvgCA=auwc.length>0?Math.round(auwc.reduce((s,u)=>s+u.totalConcessionAmount,0)/auwc.length):0;
  const cAvgCP=auwc.length>0?parseFloat((auwc.reduce((s,u)=>s+u.concPctOfRent,0)/auwc.length).toFixed(1)):0;
  const cAvgNER=allU.length>0?Math.round(allU.reduce((s,u)=>s+u.effectiveNetRent,0)/allU.length):0;
  const tga=auwc.reduce((s,u)=>s+u.totalConcessionAmount,0);
  const usc=allU.filter(u=>u.stackCount>=2).length;
  return{...comm,commConcessions:cc,bedTypes,allUnits:allU,commCoveragePct:cCov,commAvgConcAmt:cAvgCA,commAvgConcPct:cAvgCP,commAvgNetEffRent:cAvgNER,totalGivenAway:tga,unitsStackedConc:usc};
});

function getConcessionKPIs(data){const allU=data.flatMap(c=>c.allUnits);const wc=allU.filter(u=>u.hasConcession);const stk=allU.filter(u=>u.stackCount>=2);const tga=data.reduce((s,c)=>s+c.totalGivenAway,0);const allC=data.flatMap(c=>[...c.commConcessions,...c.bedTypes.flatMap(bt=>bt.btConcessions),...c.bedTypes.flatMap(bt=>bt.units.flatMap(u=>u.concessions))]);const exp=allC.filter(c=>c.status==='Active'&&c.daysRemaining>=0&&c.daysRemaining<=14).length;return{totalActive:allC.filter(c=>c.status==='Active').length,coveragePct:allU.length>0?parseFloat((wc.length/allU.length*100).toFixed(1)):0,totalGivenAway:tga,stackedUnits:stk.length,expiringSoon:exp};}

// Competitor concession data
const COMPETITOR_NAMES=['Greystar Residences','Camden Properties','Aimco Apartments','Equity Residential','Post Apartments','MAA Communities','UDR Living','Broadstone','Cortland','Bell Partners'];
const COMP_CONCESSION_TYPES=['Free Month','Move-in Special','Look & Lease','Reduced Deposit','Gift Card','Waived Fees'];
const COMP_STATUSES=['Active','Active','Active','Expired','Unverified'];

const COMPETITOR_DATA=COMMUNITIES.map(comm=>{
  const cp=PRICING_DATA.find(p=>p.id===comm.id);
  const baseRent=cp?.bedTypes[0]?.recRent??1800;
  const numComp=Math.floor(Math.random()*3)+3;
  const fmtD=d=>(d.getMonth()+1).toString().padStart(2,'0')+'/'+d.getDate().toString().padStart(2,'0')+'/'+String(d.getFullYear()).slice(2);
  const competitors=Array.from({length:numComp},(_,i)=>{
    const name=COMPETITOR_NAMES[Math.floor(Math.random()*10)];
    const bedType=['1 Bed','2 Bed','3 Bed'][Math.floor(Math.random()*3)];
    const concType=COMP_CONCESSION_TYPES[Math.floor(Math.random()*6)];
    const amount=[100,150,200,250,300,500,0][Math.floor(Math.random()*7)];
    const daysAgo=Math.floor(Math.random()*60);
    const fs=new Date(2025,3,8);fs.setDate(fs.getDate()-daysAgo);
    const vda=Math.floor(Math.random()*20);
    const lv=new Date(2025,3,8);lv.setDate(lv.getDate()-vda);
    const status=COMP_STATUSES[Math.floor(Math.random()*5)];
    const wc=CONCESSIONS_DATA.find(c=>c.id===comm.id);
    const wbt=wc?.bedTypes.find(b=>b.type===bedType);
    const wAvg=wbt?.avgAmount??0;
    let windsorResponse;
    if(wAvg===0)windsorResponse='No concession';else if(wAvg>amount+50)windsorResponse='Exceeding';else if(Math.abs(wAvg-amount)<=50)windsorResponse='Matched';else windsorResponse='Below market';
    const hLen=Math.floor(Math.random()*4)+2;
    const history=Array.from({length:hLen},(_,h)=>{const hd=new Date(fs);hd.setDate(hd.getDate()-(h*15));return{date:fmtD(hd),amount:amount+Math.floor(Math.random()*100-50),type:COMP_CONCESSION_TYPES[Math.floor(Math.random()*6)],status:h===0?status:'Expired'};});
    return{id:'COMP-'+comm.id+'-'+i,commId:comm.id,commName:comm.name,metro:comm.metro,name,bedType,concType,amount,firstSeen:fmtD(fs),lastVerified:fmtD(lv),verifiedDaysAgo:vda,status,windsorResponse,windsorAvgAmount:wAvg,flaggedForResponse:false,unitCoverage:parseFloat((Math.random()*50+15).toFixed(1)),history};
  });
  const activeComps=competitors.filter(c=>c.status==='Active');
  const avgCompAmount=activeComps.length>0?Math.round(activeComps.reduce((s,c)=>s+c.amount,0)/activeComps.length):0;
  const wComm=CONCESSIONS_DATA.find(c=>c.id===comm.id);
  const windsorAvg=wComm?Math.round(wComm.bedTypes.reduce((s,bt)=>s+bt.avgAmount,0)/wComm.bedTypes.length):0;
  const marketPosition=windsorAvg===0&&avgCompAmount>0?'No concession':windsorAvg>avgCompAmount+50?'Leading':Math.abs(windsorAvg-avgCompAmount)<=50?'At market':'Below market';
  return{commId:comm.id,commName:comm.name,metro:comm.metro,state:comm.state,rm:comm.rm,cd:comm.cd,competitors,numActive:activeComps.length,numTotal:competitors.length,avgCompAmount,windsorAvg,marketPosition};
});

function getMarketKPIs(data){
  const all=data.flatMap(c=>c.competitors);const active=all.filter(c=>c.status==='Active');
  const moreAgg=data.filter(c=>c.avgCompAmount>c.windsorAvg+50).length;
  const leading=data.filter(c=>c.marketPosition==='Leading').length;
  const unverified=all.filter(c=>c.verifiedDaysAgo>14).length;
  const tc={};active.forEach(c=>{tc[c.concType]=(tc[c.concType]||0)+1;});
  const mc=Object.entries(tc).sort((a,b)=>b[1]-a[1])[0];
  return{moreAggressive:moreAgg,windsorLeading:leading,mostCommonType:mc?mc[0]:'\u2014',mostCommonPct:mc?Math.round(mc[1]/active.length*100):0,unverified};
}

// Rent Control — full model
const RC_PROGRAM_TYPES=[{code:'RS',label:'Rent Stabilized',description:'Annual increases set by Rent Guidelines Board',color:'#e8007d',bg:'rgba(232,0,125,0.1)',maxIncrease:{oneYear:2.75,twoYear:5.25},authority:'NYC Rent Guidelines Board'},{code:'RC',label:'Rent Controlled',description:'Maximum Base Rent system, pre-1947 buildings',color:'#e05252',bg:'rgba(248,113,113,0.12)',maxIncrease:{annual:7.5},authority:'NYS DHCR'},{code:'AB',label:'AB 1482',description:'CA Tenant Protection Act: 5% + CPI, max 10%',color:'#f5a623',bg:'rgba(245,166,35,0.12)',maxIncrease:{annual:10},authority:'CA Dept. of Housing'},{code:'S8',label:'Section 8',description:'HUD Housing Choice Voucher',color:'#60a5fa',bg:'rgba(96,165,250,0.12)',maxIncrease:null,authority:'HUD'},{code:'LI',label:'LIHTC',description:'Low Income Housing Tax Credit — rents capped at 30% AMI',color:'#a78bfa',bg:'rgba(167,139,250,0.12)',maxIncrease:null,authority:'IRS / State Housing Agency'},{code:'AF',label:'Affordable',description:'Local affordable housing program',color:'#4ade80',bg:'rgba(74,222,128,0.12)',maxIncrease:null,authority:'Local Housing Authority'},{code:'HA',label:'Housing Assistance',description:'Other government housing assistance',color:'#94a3b8',bg:'rgba(148,163,184,0.12)',maxIncrease:null,authority:'Various'}];
function getProgramConfig(code){return RC_PROGRAM_TYPES.find(p=>p.code===code)??null;}

const RENT_CONTROL_DATA=COMMUNITIES.map(comm=>{
  const hasRC=Math.random()>0.3;const cp=PRICING_DATA.find(p=>p.id===comm.id);
  const commProg=hasRC&&Math.random()>0.5?RC_PROGRAM_TYPES[Math.floor(Math.random()*RC_PROGRAM_TYPES.length)]:null;
  const fd=d=>(d.getMonth()+1).toString().padStart(2,'0')+'/'+d.getDate().toString().padStart(2,'0')+'/'+String(d.getFullYear()).slice(2);
  const bedTypes=(cp?.bedTypes??[]).map(bt=>{
    const btProg=hasRC&&Math.random()>0.6?RC_PROGRAM_TYPES[Math.floor(Math.random()*7)]:null;
    const units=(bt.units??[]).map(unit=>{
      const uProg=hasRC&&Math.random()>0.65?RC_PROGRAM_TYPES[Math.floor(Math.random()*7)]:null;
      const eff=uProg??btProg??commProg??null;
      const maxInc=eff?.maxIncrease?.annual??eff?.maxIncrease?.oneYear??null;
      const curInc=parseFloat((Math.random()*8+1).toFixed(1));
      let cs='N/A',cc='var(--text-muted)';
      if(eff&&maxInc){if(curInc<=maxInc*0.9){cs='Compliant';cc='#15803d';}else if(curInc<=maxInc){cs='At Limit';cc='#f5a623';}else{cs='Exceeds Limit';cc='#e05252';}}
      const br=unit.recRent??bt.recRent??1800;const mar=maxInc?Math.round(br*(1+maxInc/100)):null;
      const rd=new Date(2020,Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1);
      const nf=new Date(2025,Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1);
      return{...unit,baseRent:br,unitProgram:uProg,btProgram:btProg,commProgram:commProg,effectiveProgram:eff,maxIncrease:maxInc,currentIncrease:curInc,complianceStatus:cs,complianceColor:cc,maxAllowableRent:mar,registrationDate:eff?fd(rd):null,nextFilingDate:eff?fd(nf):null,notes:null};
    });
    const rcu=units.filter(u=>u.effectiveProgram);const ncu=units.filter(u=>u.complianceStatus==='Exceeds Limit');const alu=units.filter(u=>u.complianceStatus==='At Limit');
    return{...bt,units,btProgram:btProg,rcUnits:rcu.length,totalUnits:units.length,nonCompliantUnits:ncu.length,atLimitUnits:alu.length};
  });
  const allU=bedTypes.flatMap(bt=>bt.units);const rcu=allU.filter(u=>u.effectiveProgram);const nc=allU.filter(u=>u.complianceStatus==='Exceeds Limit');const al=allU.filter(u=>u.complianceStatus==='At Limit');
  return{...comm,commProgram:commProg,bedTypes,allUnits:allU,rcUnitCount:rcu.length,totalUnitCount:allU.length,nonCompliantCount:nc.length,atLimitCount:al.length,hasAnyRC:rcu.length>0};
});

function getRCKPIs(data){const allU=data.flatMap(c=>c.allUnits);const rcu=allU.filter(u=>u.effectiveProgram);const nc=allU.filter(u=>u.complianceStatus==='Exceeds Limit');const al=allU.filter(u=>u.complianceStatus==='At Limit');const cwrc=data.filter(c=>c.hasAnyRC);const byProg={};rcu.forEach(u=>{const c=u.effectiveProgram.code;byProg[c]=(byProg[c]||0)+1;});return{totalRCUnits:rcu.length,totalUnits:allU.length,nonCompliant:nc.length,atLimit:al.length,commWithRC:cwrc.length,byProgram:byProg};}

// Chart data for exposure panel
const CHART_MONTHS = ['Jan 25','Feb 25','Mar 25','Apr 25','May 25','Jun 25','Jul 25','Aug 25','Sep 25','Oct 25','Nov 25','Dec 25'];

function makeExposureData() {
  return CHART_MONTHS.map((m, i) => ({
    month: m,
    vacantExposure: +(Math.random() * 2.5 + 1.0).toFixed(2),
    exp30:          +(Math.random() * 2.5 + 1.5).toFixed(2),
    exp60:          +(Math.random() * 3.0 + 2.0).toFixed(2),
  }));
}

function makePricingData(baseRent) {
  return CHART_MONTHS.map(m => {
    const compMedian = baseRent + 60 + Math.floor(Math.random() * 80 - 40);
    return {
      month: m,
      windsorMedian: baseRent + Math.floor(Math.random() * 60 - 30),
      compMedian,
      compFloor:   compMedian - 150 + Math.floor(Math.random() * 40 - 20),
      compCeiling: compMedian + 180 + Math.floor(Math.random() * 40 - 20),
    };
  });
}
