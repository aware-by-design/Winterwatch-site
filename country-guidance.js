"use strict";(()=>{window.WINTERWATCH_JURISDICTIONS=Object.freeze([["at","Austria"],["be","Be\
lgium"],["bg","Bulgaria"],["hr","Croatia"],["cy","Cyprus"],["cz","Czechia"],["dk",
"Denmark"],["ee","Estonia"],["fi","Finland"],["fr","France"],["de","Germany"],["\
gr","Greece"],["hu","Hungary"],["ie","Ireland"],["it","Italy"],["lv","Latvia"],[
"lt","Lithuania"],["lu","Luxembourg"],["mt","Malta"],["nl","Netherlands"],["pl",
"Poland"],["pt","Portugal"],["ro","Romania"],["sk","Slovakia"],["si","Slovenia"],
["es","Spain"],["se","Sweden"]].map(([t,i])=>Object.freeze({id:t,name:i})));const n=window.
WINTERWATCH_SOURCES;Object.assign(n,{countryDe:{title:"Germany: current BSIG and\
 NIS2 commencement",org:"Federal German statute · amended 22 Oct 2026",url:"htt\
ps://www.gesetze-im-internet.de/bsig_2025/BSIG.pdf",kind:"National enacted law ·\
 sections 32–33",activity:"Read registration and reporting triggers, scope exc\
lusions and the current BSI route."},countryBe:{title:"Belgium: NIS2 assessment \
and certification milestones",org:"CCB · official FAQ",url:"https://atwork.safe\
onweb.be/frequently-asked-questions-faq-nis2-and-cyberfundamentals",kind:"Nation\
al authority guidance · pathway-specific milestones",activity:"Compare CyFun, I\
SO and direct-inspection pathways. Do not confuse an assessment milestone with a\
 reporting grace period."},countryIt:{title:"Italy: NIS2 implementation decree",
org:"Gazzetta Ufficiale · Legislative Decree 138/2024",url:"https://www.gazzett\
aufficiale.it/eli/id/2024/10/01/24G00155/SG",kind:"National enacted law",activity:"\
Identify the entity’s listing year and its applicable ACN communications."},italyCohort:{
title:"ACN Determination 127434/2026 · official document",org:"ACN · 13 Apr 202\
6 · published by MUR",url:"https://trasparenza.mur.gov.it/archiviofile/mur/Altr\
i%20contenuti/Avvisi%20e%20News/DetACN_MisureSicurezza.v4_post.pdf",kind:"Nation\
al authority determination · first-listed 2026 cohort",activity:"Read Article 1\
 for first-listed 2026 entities. Confirm applicability and later determinations \
with ACN."},countryNl:{title:"Netherlands: Cyberbeveiligingswet commencement",org:"\
NCSC Netherlands · official guidance",url:"https://www.ncsc.nl/cyberbeveiliging\
swet-nis2",kind:"National authority guidance · enacted 15 Aug 2026",activity:"C\
heck scope, registration, sector reporting and the central MijnNCSC route."},countryFr:{
title:"France: current ANSSI NIS2 guidance",org:"ANSSI · national guidance",url:"\
https://cyber.gouv.fr/reglementation/cybersecurite-systemes-dinformation/directi\
ves-nis-nis2-et-dispositif-saiv/directive-nis-2/",kind:"Preparation guidance; en\
actment must be checked",activity:"Distinguish the pending transposition work fr\
om existing OSE / OIV obligations."},franceStatus:{title:"France: first-reading \
adoption, 17 Nov 2026",org:"Assemblée nationale · official legislative update",
url:"https://www.assemblee-nationale.fr/dyn/actualites-accueil-hub/adoption-du-p\
rojet-de-loi-relatif-a-la-resilience-des-infrastructures-critiques-et-au-renforc\
ement-de-la-cybersecurite",kind:"Bill adopted at first reading; not proof of com\
mencement",activity:"Distinguish parliamentary adoption from promulgation and co\
mmencement. Check the final law and implementing texts before assigning deadline\
s."},countryIe:{title:"Ireland: official NIS2 implementation guidance",org:"NCSC\
 Ireland · national implementation guidance",url:"https://ncsc.gov.ie/nis2/",kind:"\
Official implementation guidance; confirm final national enactment",activity:"Ch\
eck current transposition, scope and reporting guidance; preparation guidance is\
 not an enacted commencement date."},countryEs:{title:"Spain: draft cybersecurit\
y coordination law",org:"Ministry of the Interior · 14 Jan 2025",url:"https://w\
ww.interior.gob.es/opencms/es/detalle/articulo/El-Consejo-de-Ministros-aprueba-e\
l-anteproyecto-de-Ley-de-Coordinacion-y-Gobernanza-de-la-Ciberseguridad/",kind:"\
Draft announcement; final NIS2 enactment not verified in this review",activity:"\
Check BOE for the latest enacted position and retain applicable existing reporti\
ng duties."},countryFi:{title:"Finland: NIS2 and Cybersecurity Act",org:"Trafico\
m / NCSC-FI · national guidance",url:"https://www.kyberturvallisuuskeskus.fi/en\
/our-activities/regulation-and-supervision/nis2-european-union-cybersecurity-dir\
ective",kind:"National authority guidance · effective 8 Apr 2025",activity:"Fin\
d the relevant sector supervisor and significant-incident reporting service."},aiNational:{
title:"AI Act national resources and authorities",org:"European Commission · AI \
Act Service Desk",url:"https://ai-act-service-desk.ec.europa.eu/en/national-reso\
urces",kind:"National resource directory; identify the competent authority",activity:"\
Find the authority for the country and issue. A helpdesk, market-surveillance au\
thority, DPA and CSIRT have different roles."},police:{title:"National online cy\
bercrime reporting routes",org:"Europol",url:"https://www.europol.europa.eu/repo\
rt-a-crime/report-cybercrime-online",kind:"National law-enforcement routing dire\
ctory",activity:"Identify the appropriate national police route. Criminal report\
ing does not automatically replace regulatory notification."}});window.WINTERWATCH_COUNTRIES=
[{id:"de",name:"Germany",status:"Enacted",effective:"2025-12-06",source:"country\
De",authority:"BSI; check sector-specific exclusions and competent authority.",report:"\
https://mip2.bsi.bund.de/de/info-nis2-registrierung/",reportLabel:"BSI registrat\
ion and reporting instructions",privacy:"https://www.bfdi.bund.de/EN/Service/Ans\
chriften/Laender/Laender-node.html",privacyLabel:"Find the competent federal / L\
and DPA",note:"BSIG section 33 generally requires registration within three mont\
hs of first / renewed qualification. Section 32 has staged significant-incident \
reporting. Some sectors use specific regimes.",milestones:[]},{id:"be",name:"Bel\
gium",status:"Enacted",effective:"2024-10-18",source:"countryBe",authority:"Cent\
re for Cybersecurity Belgium / national CSIRT.",report:"https://ccb.belgium.be/c\
ert/report-incident",reportLabel:"CCB incident guidance · choose NIS2 entity",privacy:"\
https://www.autoriteprotectiondonnees.be/",privacyLabel:"APD–GBA · establish com\
petence and breach route",note:"The 2026 and 2027 conformity milestones depend o\
n the selected assurance pathway. They do not postpone risk-management or incide\
nt-reporting duties.",milestones:[{date:"2027-04-18",name:"Belgium: essential-en\
tity conformity milestone",detail:"Pathway-specific certification / verification\
 or progress requirements; confirm current CCB instructions.",source:"countryBe"}]},
{id:"it",name:"Italy",status:"Enacted · staged cohorts",effective:"2024-10-16",
source:"countryIt",authority:"ACN / CSIRT Italia, with applicable sector respons\
ibilities.",report:"https://www.acn.gov.it/portale/w/guida-alla-notifica-degli-i\
ncidenti-informatici",reportLabel:"ACN incident-notification guidance",privacy:"\
https://www.garanteprivacy.it/data-breach",privacyLabel:"Garante · data-breach g\
uidance",note:"The listing year matters. For the 2025 cohort, notification and b\
aseline-measure timing follows the listing communication and relevant determinat\
ion. The dates below concern first-listed 2026 entities under Determination 1274\
34/2026; confirm ACN applicability and later changes.",milestones:[{date:"2027-0\
1-01",name:"Italy: first-listed 2026 cohort notification starts",detail:"Specifi\
c cohort under ACN Determination 127434/2026; not a universal Italian grace peri\
od.",source:"italyCohort"},{date:"2027-07-31",name:"Italy: first-listed 2026 coh\
ort baseline measures",detail:"Specific ACN cohort deadline; verify the entity’s\
 listing communication.",source:"italyCohort"}]},{id:"nl",name:"Netherlands",status:"\
Enacted",effective:"2026-08-15",source:"countryNl",authority:"Designated sector \
CSIRT and regulator, reached through MijnNCSC.",report:"https://www.ncsc.nl/cybe\
rbeveiligingswet-nis2/meldplicht",reportLabel:"NCSC reporting duty and MijnNCSC \
routing",privacy:"https://autoriteitpersoonsgegevens.nl/",privacyLabel:"Autorite\
it Persoonsgegevens · breach route",note:"The Cyberbeveiligingswet replaced Wbn\
i. Check entity scope, sector significance thresholds and exceptions. The centra\
l mandatory report reaches both the sector CSIRT and regulator.",milestones:[]},
{id:"fr",name:"France",status:"Pending in retrieved official material",effective:null,
source:"franceStatus",authority:"ANSSI / CERT-FR; existing OSE / OIV obligations\
 can still apply.",report:"https://cert.cyber.gouv.fr/contact/",reportLabel:"CER\
T-FR contact and incident declaration",privacy:"https://www.cnil.fr/",privacyLabel:"\
CNIL · competent DPA and breach process",note:"The Assemblée nationale adopted \
the transposition bill at first reading on 17 November 2026. First-reading adopt\
ion is not proof of promulgation or commencement. No enacted NIS2 commencement i\
s established here; check the final law, implementing texts and later official g\
uidance.",milestones:[]},{id:"ie",name:"Ireland",status:"Pending in retrieved of\
ficial material",effective:null,source:"countryIe",authority:"NCSC / CSIRT-IE an\
d relevant sector competent authorities.",report:"https://ncsc.gov.ie/incidentre\
porting/",reportLabel:"NCSC current incident-reporting guidance",privacy:"https:\
//www.dataprotection.ie/",privacyLabel:"DPC · personal-data breach process",note:"\
The retrieved NCSC material describes pending transposition and existing NIS1 ar\
rangements for designated OESs. No enacted NIS2 commencement is established here\
. Check the current national guidance and any later law; a plan or draft is not \
an enacted deadline.",milestones:[]},{id:"es",name:"Spain",status:"Final enactme\
nt not verified",effective:null,source:"countryEs",authority:"Sector authority; \
INCIBE-CERT, CCN-CERT or ESPDEF-CERT according to scope.",report:"https://www.in\
cibe.es/sites/default/files/contenidos/guias/doc/guia_nacional_notificacion_gest\
ion_ciberincidentes.pdf",reportLabel:"National incident-reporting guide (Spanish\
 PDF, section 4). Choose the CSIRT for your sector",privacy:"https://www.aepd.es\
/",privacyLabel:"AEPD · establish competent breach route",note:"The official ma\
terial reviewed establishes a draft; final NIS2 enactment was not verified. Chec\
k the latest BOE. Existing RDL 12/2018 / RD 43/2021 duties remain the verified r\
eference rather than dates copied from a draft.",milestones:[]},{id:"fi",name:"F\
inland",status:"Enacted",effective:"2025-04-08",source:"countryFi",authority:"Re\
levant sector supervisory authority and Traficom / NCSC-FI.",report:"https://www\
.kyberturvallisuuskeskus.fi/en/incident-notification-under-nis-2-directive",reportLabel:"\
Sector-supervisor and NCSC-FI notification service",privacy:"https://tietosuoja.\
fi/en/",privacyLabel:"Data Protection Ombudsman · breach guidance",note:"Initia\
l registration was due 8 May 2025. The initial risk-management operating model m\
ilestone was 8 July 2025 for entities with that transition; public administratio\
ns under the Information Management Act had no equivalent transition and their d\
uty applied from 8 April 2025. Notifications through the service also reach the \
national CSIRT and can request assistance.",milestones:[]}];const e=(t,i)=>Object.
assign(window.WINTERWATCH_COUNTRIES.find(a=>a.id===t),i);e("be",{privacy:"https:\
//www.autoriteprotectiondonnees.be/professionnel/actions/violation-de-donnees-pe\
rsonnelles",privacyLabel:"APD · notify and manage a data breach"});e("nl",{privacy:"\
https://autoriteitpersoonsgegevens.nl/themas/beveiliging/datalekken/zo-meldt-u-e\
en-datalek",privacyLabel:"AP · how to report a data breach",financial:"https://\
www.dnb.nl/en/sector-information/open-book-supervision/laws-and-eu-regulations/d\
ora/",financialLabel:"DNB · DORA reporting guidance"});e("fr",{privacy:"https:/\
/www.cnil.fr/fr/services-en-ligne/notifier-une-violation-de-donnees-personnelles",
privacyLabel:"CNIL · personal-data breach notification"});e("ie",{privacy:"http\
s://www.dataprotection.ie/en/organisations/know-your-obligations/breach-notifica\
tion",privacyLabel:"DPC · breach guidance and current webform",financial:"https\
://www.centralbank.ie/regulation/digital-operational-resilience-act-dora/reporti\
ng-major-ict-related-incidents-and-significant-cyber-threats",financialLabel:"Ce\
ntral Bank of Ireland · major ICT incidents"});e("es",{privacy:"https://www.aep\
d.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/brechas-de-da\
tos-personales-notificacion",privacyLabel:"AEPD · personal-data breach notificat\
ion"});e("fi",{privacy:"https://tietosuoja.fi/ilmoitus-tietoturvaloukkauksesta",
privacyLabel:"Data Protection Ombudsman · breach notification"});e("de",{financial:"\
https://www.bundesbank.de/de/service/meldewesen/finanzaufsicht/europaeisches-mel\
dewesen/digital-operational-resilience-act-dora--951046",financialLabel:"Bundesb\
ank · DORA reporting and BaFin guidance"})})();
