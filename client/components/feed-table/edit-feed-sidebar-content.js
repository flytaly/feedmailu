import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import Link from 'next/link';
import { GreenButtonLink, NoStylesButton, SubmitButton } from '../styled/buttons';
import arrowLeftImg from '../../static/arrow-left.svg';
import periods, { periodNames } from '../../types/digest-periods';

const ContainerForm = styled.form.attrs({ method: 'POST' })`
    display: flex;
    flex-direction: column;
`;
const ImgContainerButton = styled(NoStylesButton)`
    width: 2rem;
    height: 2rem;
`;
const FeedLogoImg = styled.img`
    max-width: 50%;
    max-height: 4rem;
`;
const Row = styled.div`
    display: flex;
    margin: 0.5rem 0;
    align-items: center;
    & > * {
        margin-right: 1rem;
    }
`;
const FieldData = styled.div`
    flex-grow: 1;
    /* background-color: white; */
    border: 1px solid ${props => props.theme.borderColor};
    padding: 0.5rem;
    font-size: 1.3rem;
    min-height: 3rem;
    word-break: break-all;
`;

const Select = styled(FieldData).attrs({
    as: 'select',
})`
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjEuNDEgNC42NyAyLjQ4IDMuMTggMy41NCA0LjY3IDEuNDEgNC42NyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIzLjU0IDUuMzMgMi40OCA2LjgyIDEuNDEgNS4zMyAzLjU0IDUuMzMiLz48L3N2Zz4=) #FFFFFF 100% 50% / 1.6rem no-repeat;
    cursor: pointer;
`;

const SpaceBetweenRow = styled(Row)`
    justify-content: space-between;
`;
const FieldTitle = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
`;
const FeedLink = styled.a`
    color: inherit;
`;

const SubmitSideBarButton = styled(SubmitButton)`
    font-size: 1.5rem;
    padding: 0.4rem 2rem;
    max-width: 20rem;
`;

const EditFeed = ({ feedInfo, closeSidebar }) => {
    const { id, createdAt, lastUpdate, schedule } = feedInfo;
    const { title, link, url, imageTitle = '', imageUrl } = feedInfo.feed || {};

    return (
        <Formik
            initialValues={{ period: schedule }}
            onSubmit={async (variables, { setSubmitting, resetForm }) => {
                const { period } = variables;
                if (period !== schedule) {
                    // TODO: send data
                    resetForm();
                }
                setSubmitting(false);
            }}
        >
            {({
                /* values,
                errors,
                touched, */
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
            }) => (
                <ContainerForm onSubmit={handleSubmit}>
                    <SpaceBetweenRow>
                        <ImgContainerButton onClick={() => closeSidebar()}>
                            <img src={arrowLeftImg} alt="Go back" />
                        </ImgContainerButton>
                        {imageUrl && <FeedLogoImg src={imageUrl} title={imageTitle} />}
                    </SpaceBetweenRow>
                    <SpaceBetweenRow>
                        <Link href={`/feeds/view?id=${id}`}><GreenButtonLink>View Items</GreenButtonLink></Link>
                    </SpaceBetweenRow>
                    <Row>
                        <FieldTitle>Title:</FieldTitle>
                        <FieldData>{title}</FieldData>
                    </Row>
                    <Row>
                        <FieldTitle>Schedule</FieldTitle>
                        <Select
                            id="period"
                            name="period"
                            disabled={isSubmitting}
                            defaultValue={schedule}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            title="Select a digest period"
                        >
                            <option value={periods.EVERYHOUR}>{`${periodNames[periods.EVERYHOUR]} digest`}</option>
                            <option value={periods.EVERY2HOURS}>{`${periodNames[periods.EVERY2HOURS]} digest`}</option>
                            <option value={periods.EVERY3HOURS}>{`${periodNames[periods.EVERY3HOURS]} digest`}</option>
                            <option value={periods.EVERY6HOURS}>{`${periodNames[periods.EVERY6HOURS]} digest`}</option>
                            <option value={periods.EVERY12HOURS}>{`${periodNames[periods.EVERY12HOURS]} digest`}</option>
                            <option value={periods.DAILY}>{`${periodNames[periods.DAILY]} digest`}</option>
                        </Select>
                    </Row>
                    <Row>
                        <FieldTitle>Site Link:</FieldTitle>
                        <FieldData>
                            <FeedLink href={link} target="_blank">
                                {link}
                            </FeedLink>
                        </FieldData>
                    </Row>
                    <Row>
                        <FieldTitle>Feed URL</FieldTitle>
                        <FieldData>
                            <FeedLink href={url} target="_blank">
                                {url}
                            </FeedLink>
                        </FieldData>
                    </Row>
                    <Row>
                        <FieldTitle>Date Added</FieldTitle>
                        <FieldData>{new Date(createdAt).toLocaleString()}</FieldData>
                    </Row>
                    <Row>
                        <FieldTitle>Date of the last digest</FieldTitle>
                        <FieldData>{new Date(lastUpdate).toLocaleString()}</FieldData>
                    </Row>
                    <Row>
                        <SubmitSideBarButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'UPDATE'}
                        </SubmitSideBarButton>
                    </Row>
                </ContainerForm>
            )}
        </Formik>
    );
};

EditFeed.propTypes = {
    feedInfo: PropTypes.shape({
        feed: PropTypes.shape({}),
        id: PropTypes.string,
        lastUpdate: PropTypes.string,
        createdAt: PropTypes.string,
        schedule: PropTypes.string,
    }).isRequired,
    closeSidebar: PropTypes.func.isRequired,
};

export default EditFeed;
