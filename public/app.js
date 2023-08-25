// document.addEventListener('DOMContentLoaded', () => {

//     Alpine.data('app', () => {

//         return {
//             pricePlans: [],
//             newPlanName: '',
//             newSmsCost: '',
//             newCallCost: '',
//             deletePlanId: '',
//             calculatePricePlan: '',
//             calculateActions: '',
//             totalBill: null,
//             createMessage: '',
//             deleteMessage: '',
//             calculateMessage: '',

//             async init() {
//                 await this.fetchPricePlans();
//             },

//             async fetchPricePlans() {
//                 try {
//                     const response = await fetch('/api/price_plans');
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch price plans');
//                     }
//                     const data = await response.json();
//                     this.pricePlans = data.pricePlans; // Update this line
//                 } catch (error) {
//                     console.error(error);
//                 }
//             },

//             async createPricePlan() {
//                 try {
//                     const response = await fetch('/api/price_plan/create', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             name: this.newPlanName,
//                             sms_cost: parseFloat(this.newSmsCost),
//                             call_cost: parseFloat(this.newCallCost)
//                         })
//                     });

//                     if (!response.ok) {
//                         throw new Error('Failed to create price plan');
//                     }

//                     this.newPlanName = '';
//                     this.newSmsCost = '';
//                     this.newCallCost = '';
//                     this.createMessage = 'Price plan created successfully.';
//                     await this.fetchPricePlans(); // Refresh the data
//                 } catch (error) {
//                     console.error(error);
//                     this.createMessage = 'Error creating price plan.';
//                 }
//             },

//             async createPricePlan() {
//                 try {
//                     const response = await fetch('/api/price_plan/create', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             name: this.newPlanName,
//                             sms_cost: parseFloat(this.newSmsCost),
//                             call_cost: parseFloat(this.newCallCost)
//                         })
//                     });

//                     if (!response.ok) {
//                         throw new Error('Failed to create price plan');
//                     }

//                     this.newPlanName = '';
//                     this.newSmsCost = '';
//                     this.newCallCost = '';
//                     await this.fetchPricePlans();
//                     this.createMessage = 'Price plan created successfully.';
//                 } catch (error) {
//                     console.error(error);
//                     this.createMessage = 'Error creating price plan.';
//                 }
//             },

//             async deletePricePlan() {
//                 try {
//                     const response = await fetch('/api/price_plan/delete', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             id: parseInt(this.deletePlanId)
//                         })
//                     });

//                     if (!response.ok) {
//                         throw new Error('Failed to delete price plan');
//                     }

//                     this.deletePlanId = '';
//                     await this.fetchPricePlans();
//                     this.deleteMessage = 'Price plan deleted successfully.';
//                 } catch (error) {
//                     console.error(error);
//                     this.deleteMessage = 'Error deleting price plan.';
//                 }
//             },

//             async calculateTotalBill() {
//                 try {
//                     const response = await fetch('/api/phonebill/calculate', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             price_plan: this.calculatePricePlan,
//                             actions: this.calculateActions
//                         })
//                     });

//                     if (!response.ok) {
//                         throw new Error('Failed to calculate total bill');
//                     }

//                     const data = await response.json();
//                     this.totalBill = data.total;
//                     this.calculateMessage = 'Total bill calculated successfully.';
//                 } catch (error) {
//                     console.error(error);
//                     this.calculateMessage = 'Error calculating total bill.';
//                 }
//             }
//         };
//     });
// });
