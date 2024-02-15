let path = "https://flexmoney.cico.ng/api"
// let path = "https://stagging-api.flexdeals.com.ng/api"
////TRANSACTIONCOST////
export const TRANSACTION_COST = `${path}/transaction-costs/Transfer/agents/{amount}`
//////AUTH///////

//login user - POST
export const LOGIN_API = `${path}/users/login`;

//login and remember user - POST (logs in with email and password and remembers token)
export const LOGIN_EMAIL_API = `${path}/users/login`;

//register user - POST
export const POST_REGISTER_API = `${path}/users/`;

//get current user - GET
export const GET_CURRENT_USER = `${path}/user`;
 
//get user info - GET 
export const GET_USER_INFO = '/agent/userinfo'; 

//post bio data - POST 
export const POST_BIO_DATA = '/agent/bio-data';

//POST contact details - POST 
export const CONTACT_DETAILS = '/agent/contact';

//PATCH agent TERMINAL- PATCH 
export const PATCH_AGENT_TERMINAL = '/agent/terminal';

//POST create agent - POST 
export const POST_CREATE_AGENT = '/agent/create'; 

//POST onboarding validation - POST 
export const POST_ONBOARDING_VALIDATION = '/onboarding/validation'; 

//POST onboarding CONFIRM - POST 
export const POST_ONBOARDING_CONFIRM = '/onboarding/confirm';

//POST onboarding verify - POST 
export const POST_ONBOARDING_VERIFY = '/onboarding/verify'; 

//POST onboarding resend - POST 
export const POST_ONBOARDING_RESEND = '/onboarding/resend'; 

//POST onboarding contact info - POST 
export const POST_ONBOARDING_CONTACTINFO = '/onboarding/contactInfo'; 

//POST Password - POST 
export const FORGOT_PASSWORDS = '/user/pass';

//Create user/sub agent - POST;
export const CREATE_SUB_USER = `${path}/agents/create-sub`; 

//get user - GET
export const GET_USER = `${path}/user`;

//get countries - GET
export const GET_ALL_COUNTRIES = '/countries/all-countries'; 

//get terminals - GET
export const GET_TERMINALS = '/terminals/terminal'; 

//get terminals serial - GET
export const GET_TERMINALS_SERIAL = '/terminals/serial'; 

//get COMISSION BALANCE - GET
export const GET_COMMISSION_BALANCE = '/commission/balance'; 

//get COMISSION CURRENT - GET
export const GET_COMMISSION_CURRENT = '/commission/current'; 

//get COMISSION WITHDRAWAL - GET
export const GET_COMMISSION_WITHDRAWAL = '/commission/withdrawal'; 

//get COMISSION DEPOSIT - GET
export const GET_COMMISSION_DEPOSIT = '/commission/deposit'; 

//get COMISSION transactionS - GET
export const GET_COMMISSION_TRANSACTIONS = '/commission/transactions'; 

//get MAIN BALANCE - GET
export const GET_MAIN_BALANCE = '/main/balance'; 

//get MAIN CURRENT - GET
export const GET_MAIN_CURRENT = '/main/current'; 

//get MAIN WITHDRAWAL - GET
export const GET_MAIN_WITHDRAWAL = '/main/withdrawal'; 

//get main DEPOSIT - GET
export const GET_MAIN_DEPOSIT = '/main/deposit'; 

//get MAIN transactionS - GET
export const GET_MAIN_TRANSACTIONS = '/main/transactions'; 

//get aggregator wallet 2 - GET
export const GET_AGGREGATORWALLET = '/aggregtorwallet';

//get Aggregator wallet - GET
export const GET_AGGREGATOR_WALLET = '/aggregator/wallet';

//update user - PUT
export const UPDATE_USER = `${path}/user`;

//update agent - PUT
export const UPDATE_AGENT_PROFILE = `${path}/agents`;

//update user password - PUT
export const UPDATE_USER_PASSWORD = `${path}/users`;

//forgot password - PATCH
export const FORGOT_PASSWORD = `${path}/user/password`;

//update user password - PATCH
export const RESET_PASSWORD = `${path}/user/token`;

//forgot transaction pin
export const FORGOT_TRANSACTION_PIN = `${path}/transaction-pins/initiate`;

//update user transaction pin- PATCH
export const RESET_TRANSACTION_PIN = `${path}/transaction-pins/reset`;

//Regenerate user transaction pin-POST
export const REGENERATE_TRANSACTION_PIN = `${path}/transaction-pins/regenerate`;

/////PARAMETERS//////////
//Get list of banks - GET
export const FETCH_BANKS = `${path}/parameters/banks`;

//Get list of bank - GET
export const FETCH_BANK = `${path}/bank-operations/banks`;

//Get list of states - GET
export const FETCH_STATES = `${path}/parameters/states`;

//Get list of local governments - GET
export const FETCH_LGAS = `${path}/parameters/cities`;

///////AGENT DASHBOARD DATA/////////
export const AGENT_DASHBOARD_DATA = `${path}/agent/dashboard-data`;

///////AGENT DASHBOARD DATA/////////
export const COMMISSION_DASHBOARD_DATA = `${path}/agent/dashdashboard-data`;

//////AGENT INFO///////

//get agent transaction log
export const GET_AGENT_INFO = `${path}/agents/info`;

//////TERMINALS///////

//list terminals - GET
export const LIST_TERMINALS = `${path}/terminals`;

//add terminal - POST
export const ADD_TERMINAL = `${path}/terminals`;

//update terminal - PATCH
export const UPDATE_TERMINAL = `${path}/terminals/id`;

//assign terminal - PUT
export const ASSIGN_TERMINAL = `${path}/terminals`;

//unassign terminal - DELETE
export const UNASSIGN_TERMINAL = `${path}/terminals`;

//initialize agent activation - PUT
export const INITIALIZE_AGENT_ACTIVATION = `${path}/terminals/agents/initialize`;

//activate agent - PUT
export const ACTIVATE_AGENT = `${path}/terminals/agents/activate`;

//search terminals - GET
export const SEARCH_TERMINALS = `${path}/terminals/search`;

/////WALLETS//////

//get wallet history - GET
export const GET_AGENT_WALLET_HISTORY = `${path}/agents/wallets`;

//get wallet logs - GET
export const ALL_WALLET_LOGS = `${path}/wallets/all`;

//post fund agent wallet - POST
export const FUND_AGENT_WALLET = `${path}/wallets/admin`;

///debit agent wallet (admin) - PUT
export const DEBIT_AGENT_WALLET = `${path}/wallets/admin`;

//search wallet
export const SEARCH_WALLET = `${path}/wallets/search`;

//agent wallet transfer
export const WALLET_TRANSFER = `${path}/wallets/transfer`;

//agent wallet transfer
export const VALIDATE_AGENT = `${path}/agents/validate`;

//agent fund wallet request
export const FUND_WALLET_REQUEST = `${path}/fund-requests`;

/////COMMISSION//////

//get commission history - GET
export const GET_AGENT_COMMISSION_HISTORY = `${path}/agents/commission-histories`;

//get commission logs - GET
export const ALL_COMMISSION_LOGS = `${path}/commission/all`;

//post fund agent commission - POST
export const FUND_AGENT_COMMISSION = `${path}/commission/admin`;

///debit agent commission (admin) - PUT
export const DEBIT_AGENT_COMMISSION = `${path}/commission/admin`;

//search commission
export const SEARCH_COMMISSION = `${path}/commission/search`;

//agent commission transfer
export const COMMISSION_TRANSFER = `${path}/agents/commissions/withdraw`;



/////TRANSACTIONS/////

//get agent transaction history - GET
export const AGENT_TRANSACTION_HISTORY = `${path}/transactions`;

//post initiate cashout - POST
export const INITIATE_CASHOUT = `${path}/transactions/cashless`;

///coral pay webhook - POST
export const CORAL_PAY_WEBHOOK = `${path}/transactions/coral`;

//search transctions - GET
export const SEARCH_TRANSACTIONS = `${path}/transactions/search`;

//activity - GET
export const ACTIVITY_LOGS = `${path}/logs`;

/////SERVICES/////////

/////AIRTIME & DATA///////
//get list of telcos - GET
export const GET_TELCOS = `${path}/airtime/telcos`;

//get data plans - POST
export const GET_DATA_PLANS = `/airtime-data/data/bundle`;

//vend data - POST
export const VEND_DATA = `${path}/airtime-data/data/vend`;

//vend airtime - POST
export const VEND_AIRTIME = `/airtime-data/airtime/vend`;

/////CABLE TV//////////
//Validate multichoice smart card number
export const VALIDATE_MULTICHOICE_CUSTOMER = `${path}/cabletv/validate/multichoice`;

//get cable plans
export const GET_CABLE_PLANS = `${path}/cabletv/bouquets`;

//get startimes plans - GET
export const GET_STARTIMES_PLANS = `${path}/cable/multichoice/startimes`;

//validate startimes customer - POST
export const VALIDATE_STARTIMES_CUSTOMER = `${path}/cabletv/validate/startimes`;

//vend startimes - POST
export const VEND_STARTIMES = `${path}/cabletv/subscribe/startimes`;

//get dstv plans - POST
export const GET_DSTV_PLANS = `${path}/cable/multichoice/dstv`;

//get gotv plans - POST
export const GET_GOTV_PLANS = `${path}/cable/multichoice/gotv`;

//vend gotv - POST
export const VEND_MULTICHOICE = `${path}/cabletv/subscribe/multichoice`;

//////BANK OPERATIONS///////

//get list of banks - GET
export const GET_BANK_LIST = `${path}/banks/lists`;

//verify account - GET
export const VERIFY_ACCOUNT = `${path}/recipient/verify`;

//disburse funds -- POST
export const DISBURSE_FUNDS = `${path}/funds/transfer`;

///////ENERGY//////////////////

//get energy vendors - GET
export const GET_ENERGY_VENDORS = `${path}/energy/discos`;

//validate meter number - PUT
export const VALIDATE_METER_NUMBER = `${path}/electricity/validate`;

//vend energy - POST
export const VEND_ENERGY = `${path}/electricity/vend`;

//////////CASHCALL///////////

//Initiate cashcall
export const INITIATE_LIQUID_CASHCALL = `${path}/cashcall/initiate`;

//Post opportunity
export const POST_OPPORTUNITY = `${path}/cashcall/request`;

//Get cashcall list
export const GET_CASHCALL_LIST = `${path}/cashcall`;

//cash call
export const INITIATE_PHYSICAL_CASHCALL = `${path}/cashcall/initiate-accept`;

//Accept cash
export const ACCEPT_OPPORTUNITY = `${path}/cashcall/accept`;

//Release funds
export const RELEASE_FUNDS = `${path}/cashcall/release-funds`;

//Cancel cashcall
export const CANCEL_CASHCALL = `${path}/cashcall/cancel-funds`;

//List opportunities
export const OPPORTUNITIES_LIST = `${path}/cashcall/opportunities`;

////AGGREGATOR - SUPER AGENTS

//Get aggregator dashboard
export const AGGREGATOR_DASHBOARD = `${path}/super-agents/dashboard`;

//Get sub agents list
export const GET_SUB_AGENTS = `${path}/super-agents/agents`;

//Get agent commission history
export const GET_COMMISSION_HISTORY = `${path}/super-agents/commissions`;

//Create agents - POST
export const CREATE_AGENT = `${path}/super-agents/agents/create`;

//Agent registration - POST
export const REGISTER_AGENT = `${path}/users/register`;

//List sub users - GET
export const LIST_USERS = `${path}/agents/subs`;

//Delete sub user - DEL
export const DELETE_USER = `${path}/agents/subs`;

///////////BETTING////////////
//place bet - POST
export const PLACE_BET = `${path}/fusion/events/placebet`;

//list supported banks - GET
export const LIST_SUPPORTED_BANKS = `${path}/fusion/banks`;

//bank details - POST
export const BANK_DETAILS = `${path}/fusion/banks/details`;

//fetch betslip - POST
export const FETCH_BETSLIP = `${path}/fusion/events/slip`;

//bank verification details - POST
export const BANK_VERIFICATION = `${path}/fusion/banks/account/verify`;

//list events - POST
export const LIST_EVENTS = `${path}/fusion/events`;

//fund wallet fusion/cloudbet - POST
export const FUND_BETTING_WALLET_CLOUDBET = `${path}/fusion/transactions/deposit`;

//fund wallet opay - POST
export const FUND_BETTING_WALLET = `${path}/betting/transact`;

//lookup account ID opay
export const LOOKUP_ACCOUNT = `${path}/betting/lookup`;

//requery status opay
export const REQUERY_BET_STATUS = `${path}/betting/status`;

//get betting providers
export const GET_BETTING_PROVIDERS = `${path}/betting/providers`;

//requery - GET
export const REQUERY = `${path}/fusion/transactions/requery/CiCO_RKGWBF8NE4ST326`;

//set transaction pin - POST
export const SET_PIN = `${path}/agents/settings/pin`;

//change transaction pin - POST
export const CHANGE_PIN = `${path}/agents/settings/pin/change`;

// verify current pin = POST
export const VERIFY_CURRENTT_PIN = `${path}/agents/settings/pin/current/verify`;

//////////LOAN////////////

//loan history
export const LOAN_HISTORY =
    'https://loanserve.cicoserve.xyz/api/v1/loans/history';

//loan repayment history
export const REPAYMENT_HISTORY =
    'https://loanserve.cicoserve.xyz/api/v1/loans/repayments';

//agents info
export const AGENTS_INFO = 'https://loanserve.cicoserve.xyz/api/v1/info';

//check loan eligibility
export const CHECK_ELIGIBILITY =
    'https://loanserve.cicoserve.xyz/api/v1/loans/eligibility';

//application
export const LOAN_APPLICATION =
    'https://loanserve.cicoserve.xyz/api/v1/loans/apply';

//requery transactions
export const REQUERY_TRANSACTION_STATUS = `${path}/transactions/verify`;

//////////REGISTRATION SELECT////////////
export const REGISTRATION_SELECT = `${path}/selects`;

//////////DOCUMENTS UPLOAD////////////
export const UPLOAD_DOCUMENT = `https://services.agents.cicoserve.com/api/upload/file`;

export const SUBMIT_DOCUMENT = `https://services.agents.cicoserve.com/api/bulk/image/path`;

export const UPLOADED_DOCUMENT = `https://services.agents.cicoserve.com/api/image/status`;
