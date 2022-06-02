<template>
  <div class='page-wrapper'>
    <header class='home-page-header'>
      Orders Page
    </header>
    <div class="full-orders-page-wrapper" v-if="this.orders.length!=0">
    <div class="new-order-button-wrapper" v-if="this.showNewOrderForm === false">
      <button @click="toggleShowNewOrderForm()">New Order</button>
    </div>
    <div v-else class="new-order-form">
      <form>
        <table class="order-table">
          <tr>
            <td class='left'>
              Wrestler:
            </td>
            <td>
              <input type="text" name="wrestler" @change="setNewOrderField($event)" :value="this.newOrder.wrestler"/>
            </td>
          </tr>
          <tr>
            <td>
              Order Name:
            </td>
            <td>
              <input type="text" name="shortName" @change="setNewOrderField($event)" :value="this.newOrder.shortName"/>
            </td>
          </tr>
          <tr>
            <td>
              Gear Style:
            </td>
            <td>
              <input type="text" name="style" @change="setNewOrderField($event)" :value="this.newOrder.style"/>
            </td>
          </tr>
          <tr>
            <td>
              Description:
            </td>
            <td>
              <textarea name="description" cols="20" rows="10" @change="setNewOrderField($event)" :value="this.newOrder.description"/>
            </td>
          </tr>
          <tr>
            <td>
              Price:
            </td>
            <td>
              <input type="number" name="price" @change="setNewOrderField($event)" :value="this.newOrder.price"/>
            </td>
          </tr>
          <tr>
            <td>
              Already Paid:
            </td>
            <td>
              <input type="radio" id="paid" name="hasPaid" value="true" @change="setNewOrderField($event)">
              <label for="paid">Paid</label>
              <input type="radio" id="unpaid" name="hasPaid" value="false" @change="setNewOrderField($event)">
              <label for="unpaid">Not Paid</label>
            </td>
          </tr>
          <tr>
            <td>
              Already Complete:
            </td>
            <td>
              <input type="radio" id="complete" name="isComplete" value="true" @change="setNewOrderField($event)"> 
              <label for="complete">Complete</label>
              <input type="radio" id="incomplete" name="isComplete" value="false" @change="setNewOrderField($event)">
              <label for="incomplete">Not Complete</label>
            </td>
          </tr>
        </table>
        
        <div v-if="buttonEnabled">
          <div v-if="newOrderButton">
            <button @click="handleSubmit($event)">Create New Gear Order</button>
          </div>
          <div v-else>
            <button @click="handleUpdateSubmit($event)">Update This Gear Order</button>
          </div>
        </div>
        <div v-else class="complete-all-fields">
          Please complete all fields
        </div>
        <div v-if="selectedOrder">
          <button @click="deleteOrder($event)">Delete Order</button>
        </div>
        <button @click="cancelOrder($event)">Cancel</button>


      </form>
    </div>
    <div v-if=this.orders class='order-items'>
      <table>
        <tr>
          <th>Update</th>
          <th>Order Num</th>
          <th>Wrestler</th>
          <th>Name</th>
          <th>Style</th>
          <th>Description</th>
          <th>Price</th>
          <th>Paid</th>
          <th>Complete</th>
        </tr>
        <tr :key="order.id" v-for="order in orders">
          <td><button @click="handleUpdateClick($event, order)">Update</button></td>
          <td>{{order.id}}</td>
          <td>{{order.wrestler}}</td>
          <td>{{order.shortName}}</td>
          <td>{{order.style}}</td>
          <td>{{order.description}}</td>
          <td>{{order.price}}</td>
          <td>{{order.hasPaid}}</td>
          <td>{{order.isComplete}}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      Loading...
    </div>
    </div>
    <div v-else>
      You do not have access to this page.
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'GearOrders',
    data: () => ({
      orders: [],
      showNewOrderForm: false,
      newOrder: {
        wrestler: null,
        shortName: null,
        style: null,
        description: null,
        price: null,
        hasPaid: null,
        isComplete: null
      },
      buttonEnabled: false,
      selectedOrder: null,
      newOrderButton: false
    }),
    mounted() {
      this.checkToken()
    },
    methods: {
      checkToken() {
        if (localStorage.getItem('access_token')) {
          this.getOrders()
        }
      },
      async getOrders() {
        this.$forceUpdate()
        const res = await axios.get(`https://cashew-gear-backend.herokuapp.com/gearorders/`, 
        {headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token'),
          "Content-Type": "application/json",
          "accept": "application/json"
        }})
        this.orders = res.data
      },
      toggleShowNewOrderForm() {
        if (this.showNewOrderForm) {
          this.showNewOrderForm = false
        } else {
          this.showNewOrderForm = true
          this.newOrderButton = true
        }
      },
      cancelOrder(event) {
        event.preventDefault()
        this.resetAll()
      },
      resetAll() {
        this.showNewOrderForm = false
        this.buttonEnabled = false
        this.newOrderButton = false
        this.newOrder.wrestler = null
        this.newOrder.shortName = null
        this.newOrder.style = null
        this.newOrder.description = null
        this.newOrder.price = null
        this.newOrder.hasPaid = null
        this.newOrder.isComplete = null
        this.selectedOrder = null
      },
      async handleUpdateClick(event, order) {
        event.preventDefault()
        this.newOrder.wrestler = order.wrestler
        this.newOrder.shortName = order.shortName
        this.newOrder.style = order.style
        this.newOrder.description = order.description
        this.newOrder.price = order.price
        this.newOrder.hasPaid = order.hasPaid
        this.newOrder.isComplete = order.isComplete
        this.showNewOrderForm = true
        this.selectedOrder = order.id
      },
      async deleteOrder(event) {
        event.preventDefault()
        await axios.delete(`https://cashew-gear-backend.herokuapp.com/gearorders/${this.selectedOrder}`, {headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token'),
          "Content-Type": "application/json",
          "accept": "application/json"
        }})
        this.resetAll()
        this.getOrders()
      },
      async handleUpdateSubmit(event) {
        event.preventDefault()
        await axios.put(`https://cashew-gear-backend.herokuapp.com/gearorders/${this.selectedOrder}`, this.newOrder, {headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token'),
          "Content-Type": "application/json",
          "accept": "application/json"
        }})
        this.resetAll()
        this.getOrders()
      },
      async handleSubmit(event) {
        event.preventDefault()

        await axios.post('https://cashew-gear-backend.herokuapp.com/gearorders/', this.newOrder, {headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token'),
          "Content-Type": "application/json",
          "accept": "application/json"
        }}).then((res) => console.log(res.data))
      .catch((err) => console.log(err.data))
        this.resetAll()
        this.getOrders()
      },
      setNewOrderField(event) {
        this.newOrder[event.target.name] = event.target.value
        this.enableSubmitButton()
      },
      enableSubmitButton() {
        if (this.newOrder.wrestler && this.newOrder.shortName && this.newOrder.style && this.newOrder.description && this.newOrder.price && this.newOrder.hasPaid && this.newOrder.isComplete) {
          this.buttonEnabled = true
          this.modifyDataTypesInFields()
        }
      },
      modifyDataTypesInFields(){
        if (this.newOrder.hasPaid === "true") {
          this.newOrder.hasPaid = true
        } else {
          this.newOrder.hasPaid = false
        }
        if (this.newOrder.isComplete =="true") {
          this.newOrder.isComplete = true
        } else {
          this.newOrder.isComplete = false
        }
        this.newOrder.price = parseInt(this.newOrder.price)


      }
    }
  }
</script>