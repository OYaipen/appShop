<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Página de Productos</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <h3>CRUD Basico en Firebase y Vue</h3>

      <div class="product-test">
        <div class="form-group">
          <input
            type="text"
            placeholder="Nombre del Producto"
            v-model="product.name"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <input type="text" placeholder="Precio" v-model="product.price" class="form-control" />
        </div>

        <div class="form-group">
          <button @click="saveData" class="btn btn-primary">Guardar</button>
        </div>
        <hr />
        <h3>Lista de Productos</h3>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Modificar</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product,index) in products" :key="index">
                <td>{{product.data().name}}</td>
                <td>{{product.data().price}}</td>
                <td>
                  <button @click="editProduct(product)" class="btn btn-primary">Editar</button>
                  <button @click="deleteProduct(product.id)" class="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Editar Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Name"
                v-model="product.name"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <input type="text" placeholder="Precio" v-model="product.price" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      },
      activeItem: null
    };
  },
  methods: {
    updateProduct() {
      db.collection("products")
        .doc(this.activeItem)
        .update(this.product)
        .then(() => {
          $("#edit").modal("hide");
          this.watcher();
          console.log("Documento actualizado con éxito!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error al actualizar documento: ", error);
        });
    },
    editProduct(product) {
      $("#edit").modal("show");
      this.product = product.data();
      this.activeItem = product.id;
    },
    deleteProduct(doc) {
      if (confirm("Estás seguro? ")) {
        db.collection("products")
          .doc(doc)
          .delete()
          .then(() => {
            console.log("Documento eliminado con éxito!");
          })
          .catch(function(error) {
            console.error("Error al eliminar documento: ", error);
          });
      }
      this.watcher();
    },
    watcher() {
      db.collection("products").onSnapshot(querySnapshot => {
        this.products = [];
        querySnapshot.forEach(doc => {
          this.products.push(doc);
        });
      });
    },
    saveData() {
      db.collection("products")
        .add(this.product)
        .then(docRef => {
          console.log("Documento escrito con id: ", docRef.id);
          this.watcher();
        })
        .catch(function(error) {
          console.error("Error al agregar documento: ", error);
        });
    }
  },
  created() {
    this.watcher();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>