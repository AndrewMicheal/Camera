import { IonButton, IonContent, IonHeader, IonImg, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React , {useEffect, useState} from "react";
import { Camera, CameraResultType } from '@capacitor/camera';
import { useHistory } from 'react-router';


import { Storage } from '@capacitor/storage';



const Home: React.FC = () => {
 

const [cameraImage , setCameraImage] = useState<any>();

const [arrPhotos ,setArrPhotos] = useState<any>([]);

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  var imageUrl = image.webPath;
  let photos = [...arrPhotos , imageUrl];
  console.log(photos)
  setArrPhotos(photos)
  setPhoto(arrPhotos);
}

const setPhoto = async (imageUrl: any) => {  
    await Storage.set({
      key: 'name',
      value: JSON.stringify(imageUrl),
    });
  };


  const getAllPhotos = async () => {
    const { value }:any = await Storage.get({ key: 'name' });
    if(JSON.parse(value) === null) {
      setArrPhotos([]);
    } else {
      setArrPhotos(JSON.parse(value));
    }
  };

  useEffect(()=> {
    getAllPhotos();
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonButton onClick = {()=> takePicture()}>Take Photo</IonButton>
          {/* <IonButton onClick = {()=> checkName()}>Get Photo</IonButton> */}
          {/* {cameraImage && <IonImg src = {cameraImage} />} */}
          {arrPhotos !== null ? arrPhotos.map((photoIng:any , index:any)=> {
            return(
              <div key = {index}>
                <IonImg src = {photoIng} />
              </div>
            );
          }) : null}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
