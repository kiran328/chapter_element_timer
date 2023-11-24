import React, { useState, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import ListItem from "./ListItem";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title:
      "Ut aliqua laborum aute sit culpa enim proident est sit commodo minim tempor. Tempor pariatur incididunt est tempor culpa reprehenderit ut ullamco id. Proident mollit occaecat ad mollit est pariatur ipsum deserunt eu commodo est qui do.",
    timer: 5000,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title:
      "Sit est id ex laboris incididunt ex sit consequat incididunt. Incididunt ea amet duis cupidatat aute adipisicing culpa velit nisi tempor ad. Cillum sunt ipsum sint eiusmod qui adipisicing. Proident sunt qui nulla est deserunt proident pariatur. Deserunt tempor velit voluptate id pariatur elit sit nulla aliqua ex amet deserunt incididunt officia. Do cillum exercitation fugiat magna consequat eu ullamco non proident do elit laborum ullamco ad.Officia dolor anim consectetur sit do nulla commodo dolore dolor commodo consectetur. Officia elit ea amet nostrud pariatur reprehenderit cillum labore sint. Labore ex ad excepteur est incididunt do aliquip labore do anim nostrud in. Deserunt culpa elit nulla cupidatat ad.",
    timer: 50000,
  },
  {
    id: "58694a0f-3da1-47e1f-bd96-145571e29d72",
    title:
      "Reprehenderit do deserunt et esse voluptate consectetur velit ipsum incididunt. Aute sint et amet deserunt occaecat proident eu sunt aliquip cupidatat ea nulla duis qui. Ea commodo ullamco quis cupidatat. Duis veniam officia amet cillum aute laborum nisi consequat. Voluptate voluptate exercitation id fugiat proident laborum quis velit. Labore culpa officia officia proident duis incididunt ipsum nostrud. Velit irure nulla cillum sint elit aute.Sint consectetur minim velit consectetur esse ad mollit dolore consectetur dolore Lorem nulla amet nisi. Irure aliqua nostrud nostrud officia nisi sit ea adipisicing. Incididunt Lorem qui velit elit consectetur cillum culpa magna laboris ullamco cupidatat labore.Laborum elit fugiat exercitation irure esse enim dolor. Ea consectetur laborum officia id aliquip dolor nisi commodo laboris eu ut in. Veniam eu Lorem ipsum pariatur non eu qui esse ullamco in magna. Ut et ea minim et mollit cillum aliqua tempor excepteur dolore excepteur amet exercitation in.Ad occaecat dolor ea est. Sit sint eiusmod magna nostrud eu consequat non cillum culpa. Officia consequat officia esse ut elit ipsum cillum reprehenderit pariatur duis fugiat sit veniam laborum. Reprehenderit magna reprehenderit dolor consequat anim ullamco ut ex culpa et aliqua adipisicing non excepteur. Elit dolore amet reprehenderit veniam eu sit eiusmod. Sint voluptate laborum elit cupidatat dolor anim anim ad culpa. Nulla nostrud elit exercitation ea id amet voluptate mollit tempor cillum ipsum nostrud culpa.",
    timer: 9000,
  },
  {
    id: "58694a0f-3da1-471f-bd96-1455371e29d72",
    title:
      "Sunt cupidatat ullamco do ullamco irure eiusmod. Aute deserunt anim nostrud duis sunt mollit elit elit reprehenderit ad. Lorem fugiat qui pariatur commodo commodo deserunt exercitation labore laboris id consectetur magna cillum nulla. Qui sint labore elit consectetur eiusmod duis eiusmod est. Consequat eiusmod cupidatat eiusmod tempor non sunt ullamco duis magna. Quis dolor aute occaecat excepteur aliquip minim anim laborum laborum eiusmod velit enim dolore minim. Consectetur laboris qui officia fugiat qui consectetur fugiat labore ex irure id mollit Lorem exercitation.Do nulla qui velit labore. Veniam proident excepteur sunt occaecat aliquip velit do sint cupidatat. Aliqua minim deserunt in consequat minim nostrud est do aliqua occaecat consequat esse eu.Excepteur qui magna eu fugiat cillum Lorem minim adipisicing. Id ex do reprehenderit commodo deserunt sint anim laborum duis ea. Pariatur elit pariatur incididunt nulla exercitation minim elit nostrud proident Lorem. Ex ea qui ea reprehenderit. Deserunt ullamco ullamco et fugiat sint duis ea ea. Eu ut sit esse dolor aliqua veniam in est.",
    timer: 30000,
  },
  {
    id: "58694a0f-3da1-471f-bd96-1e455371e29d72",
    title:
      "Consequat et Lorem nostrud dolor sint voluptate anim adipisicing quis eu nostrud proident. Laboris esse minim nostrud commodo pariatur. Minim ut velit ad enim tempor ipsum veniam proident. Dolore anim commodo in reprehenderit velit est id voluptate. Exercitation est ex eu minim velit. Qui Lorem do sint nulla veniam deserunt sit nulla ex duis.Dolor non nostrud incididunt adipisicing eiusmod do eu. Amet adipisicing cupidatat minim officia eu aute nisi. Anim consequat officia sint deserunt eu velit ea ullamco ipsum et.",
    timer: 50000,
  },

  {
    id: "586764a0f-3da1-47134d96-14557e31e29d72",
    type: "Youtube",
    youtubeId: "a3ICNMQW7Ok", //"fLeJJPxua3E", //"iPNwzNvqqTc", // "iee2TATGMyI",
    timer: 1000 * 60 * 60,
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557e31e29d72",
    title:
      "Nostrud dolor qui occaecat dolor elit incididunt amet cupidatat Lorem sint ex enim. Voluptate irure incididunt consectetur nostrud exercitation aliqua occaecat aute magna mollit. Lorem dolore incididunt veniam mollit voluptate aliquip aliqua adipisicing et duis magna. Sit proident ullamco ut dolor esse nostrud voluptate velit ad et adipisicing aute adipisicing cillum. Non labore ut adipisicing exercitation commodo magna amet aliquip cillum aliqua minim commodo adipisicing. Labore occaecat sunt Lorem sunt aute dolor. Occaecat cupidatat consequat culpa esse pariatur nisi magna id sint est.",
    timer: 20000,
  },
];

const App = () => {
  const [visibleItemIndexes, setVisibleItemIndexes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef();

  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    const visibleItemIndexArr = viewableItems.map((item) => item.index);
    let updated = [...visibleItemIndexArr];
    if (visibleItemIndexArr.length > 1) {
      updated = updated.slice(0, 1);
    }
    // console.log(updated);
    setVisibleItemIndexes(visibleItemIndexArr);
  };

  const viewabilityConfig = {
    // viewAreaCoveragePercentThreshold: 110,
    itemVisiblePercentThreshold: 70,
    // minimumViewTime: 5000,
  };

  const viewabilityConfigCallbackPairs = React.useRef([
    { onViewableItemsChanged, viewabilityConfig },
  ]);

  const handleNavigate = () => {
    if (DATA.length === currentIndex + 1) return;
    listRef.current.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
    setCurrentIndex((prevIndex) => {
      return prevIndex + 1;
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        index={index}
        title={item.title}
        type={item.type}
        youtubeId={item.youtubeId}
        timer={item.timer}
        visibleItems={visibleItemIndexes}
        onNavigate={handleNavigate}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // scrollEnabled={true}
        pagingEnabled
        horizontal
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 40,
    // marginHorizontal: 15,
  },
});

export default App;
