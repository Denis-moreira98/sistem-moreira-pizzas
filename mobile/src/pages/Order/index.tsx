import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   TextInput,
   Modal,
   FlatList,
} from "react-native";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";

type RouteDetailParams = {
   Order: {
      number: string | number;
      order_id: string;
   };
};

export type CategoryProps = {
   id: string;
   name: string;
};

type ProductProps = {
   id: string;
   name: string;
};

type ItemsProps = {
   id: string;
   product_id: string;
   name: string;
   amount: string | number;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
   const route = useRoute<OrderRouteProps>();
   const navigation = useNavigation();

   const [category, setCategory] = useState<CategoryProps[] | []>([]);
   const [categorySelected, setCategorySelected] = useState<
      CategoryProps | undefined
   >();
   const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

   const [products, setProducts] = useState<ProductProps[] | []>([]);
   const [productSelected, setProductSelected] = useState<
      ProductProps | undefined
   >();
   const [modalProductVisible, setModalProductVisible] = useState(false);

   const [amount, setAmount] = useState("1");

   const [items, setItems] = useState<ItemsProps[]>([]);

   useEffect(() => {
      async function loadInfo() {
         const response = await api.get("/category");
         //console.log(response.data);

         setCategory(response.data);
         setCategorySelected(response.data[0]);
      }
      loadInfo();
   }, []);

   useEffect(() => {
      async function loadingProducts() {
         const response = await api.get("/category/product", {
            params: {
               category_id: categorySelected?.id,
            },
         });
         //console.log(response.data);
         setProducts(response.data);
         setProductSelected(response.data[0]);
      }

      loadingProducts();
   }, [categorySelected]);

   async function handleCloseOrder() {
      try {
         await api.delete("/order", {
            params: {
               order_id: route.params?.order_id,
            },
         });

         navigation.goBack();
      } catch (err) {
         console.log(err);
      }
   }

   function handleChangeCategory(item: CategoryProps) {
      setCategorySelected(item);
   }

   function handleChangeProduct(item: ProductProps) {
      setProductSelected(item);
   }
   //Adicionando um produto na mesa
   async function handleAdd() {
      //console.log("TESTE");
      const response = await api.post("order/add", {
         order_id: route.params.order_id,
         product_id: productSelected?.id,
         amount: Number(amount),
      });
      let data = {
         id: response.data.id,
         product_id: productSelected?.id as string,
         name: productSelected?.name as string,
         amount: amount,
      };

      setItems((oldArray) => [...oldArray, data]);
   }

   //Deletando um item da lista
   async function handleDeleItem(item_id: string) {
      await api.delete("/order/remove", {
         params: {
            item_id: item_id,
         },
      });
      //Após remover da api remover esse item da nossa lista de items
      let removeItem = items.filter((item) => {
         return item.id !== item_id;
      });
      setItems(removeItem);
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.title}>Mesa {route.params.number}</Text>
            {items.length === 0 && (
               <TouchableOpacity onPress={handleCloseOrder}>
                  <Feather name="trash-2" size={28} color="#FF3f4b" />
               </TouchableOpacity>
            )}
         </View>

         {category.length !== 0 && (
            <TouchableOpacity
               style={styles.input}
               onPress={() => setModalCategoryVisible(true)}
            >
               <Text style={{ color: "#fff" }}>{categorySelected?.name}</Text>
            </TouchableOpacity>
         )}

         {products.length !== 0 && (
            <TouchableOpacity
               style={styles.input}
               onPress={() => setModalProductVisible(true)}
            >
               <Text style={{ color: "#fff" }}>{productSelected?.name}</Text>
            </TouchableOpacity>
         )}

         <View style={styles.qtdContainer}>
            <Text style={styles.qtdText}>Quantidade</Text>
            <TextInput
               style={[styles.input, { width: "60%", textAlign: "center" }]}
               placeholder="1"
               placeholderTextColor="#f0f0f0"
               keyboardType="numeric"
               value={amount}
               onChangeText={setAmount}
            />
         </View>

         <View style={styles.actions}>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
               <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[
                  styles.button,
                  { opacity: items.length === 0 ? 0.3 : 1 },
               ]}
               disabled={items.length === 0}
            >
               <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity>
         </View>

         <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1, marginTop: 24 }}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <ListItem data={item} deleteItem={handleDeleItem} />
            )}
         />

         <Modal
            transparent={true}
            visible={modalCategoryVisible}
            animationType="fade"
         >
            <ModalPicker
               handleCloseModal={() => setModalCategoryVisible(false)}
               options={category}
               selectdItem={handleChangeCategory}
            />
         </Modal>

         <Modal
            transparent={true}
            visible={modalProductVisible}
            animationType="fade"
         >
            <ModalPicker
               handleCloseModal={() => setModalProductVisible(false)}
               options={products}
               selectdItem={handleChangeProduct}
            />
         </Modal>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#1d1d2e",
      paddingVertical: "5%",
      paddingEnd: "4%",
      paddingStart: "4%",
   },
   header: {
      flexDirection: "row",
      marginBottom: 12,
      alignItems: "center",
      marginTop: 24,
   },
   title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#fff",
      marginRight: 14,
   },
   input: {
      backgroundColor: "#101026",
      borderRadius: 4,
      width: "100%",
      height: 40,
      marginBottom: 12,
      justifyContent: "center",
      paddingHorizontal: 8,
      color: "#fff",
      fontSize: 22,
   },
   qtdContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   qtdText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
   },
   actions: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
   },
   buttonAdd: {
      width: "20%",
      backgroundColor: "#3fd1ff",
      borderRadius: 4,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      color: "#101026",
      fontSize: 18,
      fontWeight: "bold",
   },
   button: {
      backgroundColor: "#3fffa3",
      height: 40,
      width: "75%",
      alignItems: "center",
      borderRadius: 4,
      justifyContent: "center",
   },
});
