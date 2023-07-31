import React, {FC} from "react";
import classes from "./ListMapper.module.scss";
import { ListMapperProps } from "../../types/list";

import cn from 'classnames';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { menuStatusFalse } from "../../store/reducers/menuStatusReducer";

import WorkExperienceBlock from "../Blocks/WorkExperienceBlock/WorkExperienceBlock";
import ProjectBlock from "../Blocks/ProjectBlock/ProjectBlock";
import EducationBlock from "../Blocks/EducationBlock/EducationBlock";
import AboutBlock from "../Blocks/AboutBlock/AboutBlock";
import SkillBlock from "../Blocks/SkillBlock/SkillBlock";
import { useTranslation } from "react-i18next";

const ListMapper:FC<ListMapperProps> = ({type, name}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const {t, i18n} = useTranslation();

    const {user} = useTypedSelector(state => state.user);
    const {mainData} = useTypedSelector(state => state.main);

    //const importantProjects = user.projects.filter(project => project.important === true);
    //const importantWorks = user.works.ru.filter(work => work.important === true);
    //const importantWorksEn = user.works.en.filter(work => work.important === true);

    //const importantEducation = user.education.filter(educate => educate.important === true);
    //const importantEducationEn = user.educationEn.filter(educate => educate.important === true);

    let routPath = '';
    let listHeading = '';
    switch (name) {
        case 'hard-skills':
            routPath = 'skills/hard-skills';
            listHeading = 'hard-skills';
            break;
        case 'soft-skills':
            routPath = 'skills/soft-skills';
            listHeading = 'soft-skills';
            break;
        case 'hard-skills-AllList':
            routPath = 'skills/hard-skills';
            listHeading = 'hard-skills';
            break;
        case 'soft-skills-AllList':
            routPath = 'skills/soft-skills';
            listHeading = 'soft-skills';
            break;
        case 'projects':
            routPath = 'projects';
            listHeading = "projects";
            break
        case 'projectsEn':
            routPath = 'projects';
            listHeading = "projects";
            break
        case 'works':
            routPath = 'work-experience';
            listHeading = 'work-experience';
            break;
        case 'worksEn':
            routPath = 'work-experience';
            listHeading = 'work-experience';
            break;
        case 'education':
            routPath = 'education';
            listHeading = 'education';
            break;
        case 'educationEn':
            routPath = 'education';
            listHeading = 'education';
            break;
        case 'about': 
            routPath = 'about';
            listHeading = 'about';
            break;
        case 'aboutEn': 
            routPath = 'about';
            listHeading = 'about';
            break;
    }

    function clickHandler (routPath:string) {
        navigate(`/cv-frontend/${routPath}/`);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        dispatch(menuStatusFalse());
    };

    switch (type) {
        case 'short':
            return (
                <div className={classes.list}>

                    <h3 className={cn("heading-l2", classes.list__heading)}
                        onClick={() => clickHandler(routPath)} 
                    >
                        {t(`headers.${listHeading}`)}
                    </h3>

                    { (name === 'hard-skills') && <ul className={classes.list__list}>
                        {mainData.skills.hard.map( (skill) =>
                            <SkillBlock type={type} 
                                        skill={skill} 
                                        key={ (typeof skill == 'string')
                                                ? skill
                                                : skill.title} />
                        )}
                    </ul>}

                    { (name === 'soft-skills') && <ul className={classes.list__list}>
                        {mainData.skills.soft.map( (skill) =>
                            <SkillBlock type={type} 
                                        skill={skill} 
                                        key={ (typeof skill == 'string')
                                                ? skill
                                                : skill.title} />
                        )}
                    </ul>}

                    { (name === 'hard-skills-AllList') && <ul className={classes.list__list}>
                        {mainData.skills.hard.map( (skill) =>
                            <SkillBlock type='short-AllList' 
                                        skill={skill} 
                                        key={ (typeof skill == 'string')
                                                ? skill
                                                : skill.title} />
                        )}
                    </ul>}

                    { (name === 'soft-skills-AllList') && <ul className={classes.list__list}>
                        {mainData.skills.soft.map( (skill) =>
                            <SkillBlock type='short-AllList'
                                        skill={skill} 
                                        key={ (typeof skill == 'string')
                                                ? skill
                                                : skill.title} />
                        )}
                    </ul>}

                    { (name === 'projects') && <ul className={classes.projectsList__list}>
                        {user.projects.ru.filter(project => project.important === true)
                                            .map( (project, i) => 
                            <ProjectBlock key={project.name} type={type} index={i + 1} project={project}/>  
                        )}
                    </ul>}

                    { (name === 'projectsEn') && <ul className={classes.projectsList__list}>
                        {user.projects.en.filter(project => project.important === true)
                                            .map( (project, i) => 
                            <ProjectBlock key={project.name} type={type} index={i + 1} project={project}/>  
                        )}
                    </ul>}

                    { (name === 'works') && <ul className={classes.list__list}>
                        {user.works.ru.filter(work => work.important === true)
                                        .map( work => 
                            <WorkExperienceBlock key={work.start + work.finish} work={work} type={type}/>
                        )}
                    </ul>}

                    { (name === 'worksEn') && <ul className={classes.list__list}>
                        {user.works.en.filter(work => work.important === true)
                                        .map( work => 
                            <WorkExperienceBlock key={work.start + work.finish} work={work} type={type}/>
                        )}
                    </ul>}

                    { (name === 'education') && <ul className={classes.list__list}>
                        {user.education.ru.filter(educate => educate.important === true)
                                        .map( educate =>
                            <EducationBlock key={educate.title + educate.year} educate={educate} type={type}/>  
                        )}
                    </ul>}

                    { (name === 'educationEn') && <ul className={classes.list__list}>
                        {user.education.en.filter(educate => educate.important === true)
                                        .map( educate =>
                            <EducationBlock key={educate.title + educate.year} educate={educate} type={type}/>  
                        )}
                    </ul>}

                    { (name === 'about') && <ul className={classes.list__list}>
                        <AboutBlock point={user.about.ru[0]}/>
                        <AboutBlock point={user.about.ru[1]}/>
                    </ul>}

                    { (name === 'aboutEn') && <ul className={classes.list__list}>
                        <AboutBlock point={user.about.en[0]}/>
                        <AboutBlock point={user.about.en[1]}/>
                    </ul>}

                </div>
            )
        case "full":
            return (
                <div className={classes.list}>

                    <h3 className={cn("heading-l2 heading-l2__passive", classes.list__heading)}
                        onClick={() => navigate(`/cv-frontend/${routPath}/`)} 
                    >
                        {t(`headers.${listHeading}`)}
                    </h3>

                    { (name === 'hard-skills') && <ul className={classes.list__list}>
                        {user.skills.hard.map( (skill) =>
                            <SkillBlock type={type} 
                                        skill={skill} 
                                        key={ (typeof skill == 'string')
                                                ? skill
                                                : skill.title} />
                        )}
                    </ul>}

                    { (name === 'soft-skills') && <ul className={classes.list__list}>
                        {user.skills.soft.map( (skill) =>
                            <SkillBlock type={type} 
                                        skill={skill} 
                                        key={ (typeof skill == 'string')
                                                ? skill
                                                : skill.title} />
                        )}
                    </ul>}

                    { (name === 'projects') && <ul className={classes.projectsList__list}>
                        {user.projects.ru.map( (project) => 
                            <ProjectBlock key={project.name} type={type} project={project}/>
                        )}
                    </ul>}

                    { (name === 'projectsEn') && <ul className={classes.projectsList__list}>
                        {user.projects.en.map( (project) => 
                            <ProjectBlock key={project.name} type={type} project={project}/>
                        )}
                    </ul>}

                    { (name === 'works') && <ul className={classes.list__list}>
                        {user.works.ru.map( work => 
                            <WorkExperienceBlock key={work.start + work.finish} work={work} type={type}/>
                        )}
                    </ul>}

                    { (name === 'worksEn') && <ul className={classes.list__list}>
                        {user.works.en.map( work => 
                            <WorkExperienceBlock key={work.start + work.finish} work={work} type={type}/>
                        )}
                    </ul>}

                    { (name === 'education') && <ul className={classes.list__list}>
                        {user.education.ru.map( educate =>
                            <EducationBlock key={educate.title + educate.year} educate={educate} type={type}/>  
                        )}
                    </ul>}

                    { (name === 'educationEn') && <ul className={classes.list__list}>
                        {user.education.en.map( educate =>
                            <EducationBlock key={educate.title + educate.year} educate={educate} type={type}/>  
                        )}
                    </ul>}

                    { (name === 'about') && <ul className={classes.list__list}>
                        {user.about.ru.map( (point, i) =>
                                <AboutBlock key={i} point={point}/>
                        )}
                    </ul>}

                    { (name === 'aboutEn') && <ul className={classes.list__list}>
                        {user.about.en.map( (point, i) =>
                                <AboutBlock key={i} point={point}/>
                        )}
                    </ul>}

                </div>
            )
    };
};

export default ListMapper;