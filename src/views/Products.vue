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
      <div class="product-test">
        <h3 class="d-inline-block">Lista de Productos</h3>
        <button @click="addNew" class="btn btn-success float-right">Agregar Producto</button>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Tag</th>
                <th>Modificar</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product,index) in products" :key="index">
                <td>{{product.name}}</td>
                <td>{{product.description}}</td>
                <td>{{product.price}}</td>
                <td>{{product.tag}}</td>
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
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Editar Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <vue-editor v-model="product.description"></vue-editor>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr />

                <div class="form-group">
                  <input
                    type="text"
                    @keyup.188="addTag"
                    placeholder="Product tags"
                    v-model="tag"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product tags"
                    v-model="product.tag"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input type="file" @change="uploadImage()" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addProduct()" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { db } from "../firebase";
export default {
  name: "Products",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        image: null
      },
      activeItem: null,
      modal: null,
      tag: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage() {},
    addNew() {
      $("#product").modal("show");
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        type: "success",
        title: "Updated  successfully"
      });
      $("#product").modal("hide");
    },
    editProduct() {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },
    deleteProduct() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(doc[".key"]).delete();
          Toast.fire({
            type: "success",
            title: "Deleted  successfully"
          });
        }
      });
    },
    readData() {},
    addProduct() {
      this.$firestore.products.add(this.product);
      Toast.fire({
        type: "success",
        title: "Product created successfully"
      });
      $("#product").modal("hide");
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>