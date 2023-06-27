import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import AsideBlock from '../AsideBlock/AsideBlock';
import Header from '../Header/Header';
import MainPage from '../../pages/MainPage/MainPage';
import ListPage from '../../pages/ListPage/ListPage';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchMain } from '../../store/action-creators/main';

const Routing = () => {
	const {mainLoading, mainError} = useTypedSelector(state => state.main)
	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(fetchMain())
    },[dispatch])

    if (mainLoading) {
        return (
            <div>Идет загрузка</div>
        )
    }
    if (mainError) {
        return (
            <div>{mainError}</div>
        )
    }
	

	return (
		<div className="container">
			<AsideBlock />
			<div className='rightPart'>
				<Header/>
				<Routes>
					{/* <Route path={'/movies-website/person/:id'} element={<PersonPage />} /> */}
					<Route path={'/cv-frontend/'} element={<MainPage/>} />
					<Route path={'/cv-frontend/projects'} element={<ListPage type='projects'/>} />
					<Route path={'/cv-frontend/work-experience'} element={<ListPage type='works'/>} />
					<Route path={'/cv-frontend/education'} element={<ListPage type='education'/>} />
					<Route path={'/cv-frontend/about'} element={<ListPage type='about'/>} />
					<Route path={'*'} element={<MainPage />} />
				</Routes>
			</div>
		</div>
	);
};

export default Routing;