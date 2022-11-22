import { IonContent, IonHeader, IonicSlides, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import CustomCard, { CustomCardData } from '../components/CustomCard';
import GridView from '../components/GridView';
import './Home.css';

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper';
import 'swiper/css';

const mockData: CustomCardData[] = [
  { title: "First Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../public/assets/images/ionic_logo.png" },
  { title: "Second Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
  { title: "Third Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
  { title: "Fourth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
  { title: "Fifth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
  { title: "Sixth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
  { title: "Seventh Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic cards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p>Products</p>
        <GridView items={mockData} />
        <p>Gallery</p>
        <Swiper modules={[IonicSlides]} freeMode={{
          enabled: true,
          sticky: false
        }} slidesPerView={"auto"}>
          {
            mockData.map((item, _) => (
              <SwiperSlide style={{ width: 200 }}>
                <CustomCard title={item.title} subtitle={item.subtitle} label={item.label} imgUrl={item.imgUrl} />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <p>Services</p>
        <GridView items={mockData} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
