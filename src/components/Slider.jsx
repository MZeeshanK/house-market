import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import Spinner from '../components/Spinner';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'asc'), limit(5));

      const querySnap = await getDocs(q);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>

        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          navigation
        >
          {listings.map((data) => (
            <SwiperSlide
              key={data.data.id}
              onClick={() => navigate(`/category/${data.data.type}/${data.id}`)}
            >
              <div
                style={{
                  background: `url(${data.data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  height: '250px',
                  width: '100%',
                  minHeight: '23vh',
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{data.data.name}</p>
                <p className="swiperSlidePrice">
                  &#8377;{data.data.discountedPrice ?? data.data.regularPrice}
                  {data.data.type === 'rent' && ' /Month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
