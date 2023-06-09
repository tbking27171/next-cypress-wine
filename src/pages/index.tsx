import type { NextPage } from 'next';
import Header from 'components/Header';
import Filter from 'components/Filter';
import CardProduct from 'components/CardProduct';
import { useContext } from 'react';
import { AppContext } from 'contexts/AppProvider';
import Loading from 'components/Loading';
import WineBox from 'components/WineBox';
import { useMediaQuery } from 'hooks/useMediaQuery';
import {
  InfoData,
  Main,
  ProductsFlex,
  SectionCenter,
  SectionError,
  SectionLoading,
  SectionProducts,
} from 'styles/Containers';
import LoadMoreMobile from 'components/LoadMoreMobile';
import PagesList from 'components/PagesList';

const Home: NextPage = () => {
  const {
    details,
    products,
    loading,
    viewCart,
    loadingData,
    search,
    getInitInfo
  } = useContext(AppContext);
  const inMobile = useMediaQuery('(max-width: 600px)');

  if (loading && !inMobile || loadingData) {
    return (
      <Main>
      <Header />
      <SectionCenter>
        <Filter />
        <SectionLoading>
          <Loading />
        </SectionLoading>
      </SectionCenter>
    </Main>
    );
  };

  /* If the request does not return any products */
  if (products.length === 0) {
    return (
      <Main>
        <Header />
        <SectionCenter>
          <Filter />
          <SectionError>
            <h1>No product found!</h1>
          </SectionError>
        </SectionCenter>
      </Main>
    );
  };

  /* If the request returns the expected data */
  return (
    <Main>
      <Header />
      <SectionCenter>
        <Filter />
        <SectionProducts>
          <InfoData inSearch={ search ? true : false }>
            <p data-cy="home_page_info_find_products">
              <strong>{ details.totalItems }</strong> produtos encontrados
              <span> para <strong>{`"${ search }"`}</strong></span>
            </p>
            <button onClick={ () => getInitInfo() }>
              Cancelar pesquisa
            </button>
          </InfoData>
          
          <ProductsFlex>
            {
              products.map((product, index) => (
                <CardProduct
                  key={ index}
                  name={ product.name }
                  id={ product.id }
                  index={ index }
                  image={ product.image }
                  discount={ product.discount }
                  price={ product.price }
                  priceMember={ product.priceMember }
                  priceNonMember={ product.priceNonMember }
                />
              ))
            }
          </ProductsFlex>

          { inMobile ? <LoadMoreMobile /> : <PagesList /> }
        </SectionProducts>
      </SectionCenter>

      { viewCart ? <WineBox /> : '' }
    </Main>
  );
};

export default Home;
