import React from 'react';
import PropTypes from 'prop-types';

import { T } from '@components/T';
import CustomCard from './CustomCard';
import { Layout, Row, Col, Divider } from 'antd';
import styled from 'styled-components';
import font from '@app/themes/fonts';

const Container = styled(Row)`
  && {
    background-color: white;
  }
`;
const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 0 7px 0 0;
`;

const Prices = styled(Col)`
  padding: 5px 10px;
`;

const SongPrice = ({ currency, price }) => {
  const currencyFont = font.combineFonts(font.size.regular, font.weights.bold);
  const priceFont = font.combineFonts(font.size.xRegular, font.weights.light);
  return (
    <p>
      <T span={true} id="text" values={{ text: currency }} font={currencyFont} />{' '}
      <T span={true} id="text" values={{ text: price }} font={priceFont} />
    </p>
  );
};

SongPrice.propTypes = {
  currency: PropTypes.string,
  price: PropTypes.number
};

const SongCard = ({ song }) => {
  const Link = (id, linkLabel, href) => (
    <p>
      <T span={true} id={id} /> <a href={href}>{linkLabel}</a>
    </p>
  );

  return (
    <CustomCard bodyStyle={{ padding: '10px 10px' }}>
      <Layout>
        <Container>
          <Col xs={6}>
            <Image src={song.artworkUrl100} />
          </Col>
          <Col xs={12}>
            <T id="text" values={{ text: song.trackName }} font={font.style.heading} />
            <T id="text" values={{ text: song.collectionName }} marginBottom={5} />
            <div style={{ marginBottom: 10 }}>
              <T id="artist_label" font={font.weights.bold} span={true} />
              <T id="text" values={{ text: song.artistName }} span={true} />
            </div>
            {song.trackViewUrl && Link('go_to', song.kind, song.trackViewUrl)}
            {Link('go_to', 'album', song.collectionViewUrl)}
          </Col>
          <Prices xs={6}>
            <T id="buy_now" font={font.style.subheading} marginBottom={3} />
            <SongPrice currency={song.currency} price={song.trackPrice} />
            <Divider style={{ margin: '10px 0' }} />
            <T id="buy_collection" font={font.style.subheading} marginBottom={3} />
            <SongPrice currency={song.currency} price={song.collectionPrice} />
          </Prices>
        </Container>
      </Layout>
    </CustomCard>
  );
};

SongCard.propTypes = {
  song: PropTypes.object
};

export default SongCard;
