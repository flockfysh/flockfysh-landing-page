import classes from '../common.module.css';
import trainingClasses from './train.module.css';
import { RxArrowRight } from 'react-icons/rx';
import Button from '../../../UI/button/button';
import { CustomCreatableSelect } from '../../../UI/input/selectInput';
import React from 'react';
import { LABEL_COLORS } from '../../../../settings';
import api from '../../../../helpers/api';
import { AxiosError } from 'axios';
import { ErrorContext } from '../../../../contexts/errorContext';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { v4 } from 'uuid';
import { ProgressScreenProps } from '../progressScreen/progressScreen';

dayjs.extend(Duration);
dayjs.extend(RelativeTime);

interface InitiateTraningRequest {
    class_search_queries: Record<string, string[]>;
    desired_data: number;
}

function TrainingLabels(props: React.ComponentPropsWithRef<'label'> & { labelColor?: string }) {
    const { labelColor, ...smallProps } = props;

    return (
        <label { ...smallProps } className={ `${trainingClasses.label} ${props.className || ''}` }>
            <div className={ trainingClasses.labelDot } style={ {
                backgroundColor: labelColor ?? LABEL_COLORS[0],
            } }></div>
            {props.children}
        </label>
    );
}

export default function Train(props: {
    dataset: Dataset,
    setTaskInProgress: React.Dispatch<React.SetStateAction<boolean>>
    setProgressScreenProps: React.Dispatch<React.SetStateAction<ProgressScreenProps|undefined>>
}) {
    const { throwError } = React.useContext(ErrorContext);

    if (props.dataset.state === 'completed') {
        return <Navigate to={ `/dashboard/${props.dataset.id}/dataset-images` }/>;
    }

    async function initiateSubmission(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            if (props.dataset.state === 'untrained') {
                const submissionForm = e.currentTarget;
                const fd = new FormData(submissionForm);
                const classSearchQueries: Record<string, string[]> = {};
                for (const key of fd.keys()) {
                    if (/^searchQuery/.test(key)) {
                        const labelIndex = +key.split('_')[1];
                        const label = props.dataset.classes[labelIndex];
                        classSearchQueries[label] = fd.getAll(key) as string[];
                    }
                }
                const requestBody: InitiateTraningRequest = {
                    // eslint-disable-next-line camelcase
                    desired_data: +(fd.get('desired_data') as string),
                    // eslint-disable-next-line camelcase
                    class_search_queries: classSearchQueries,
                };
                await api.post(`/api/dataset/${props.dataset.id}/initializeTraining`, requestBody);
            }
            else if (props.dataset.state === 'feedback') {
                await api.post(`/api/dataset/${props.dataset.id}/continueTraining`);
            }
            props.setTaskInProgress(true);
            props.setProgressScreenProps({
                current: 0,
                total: 100,
                description: 'Starting Flockfysh training...',
            });
        }
 catch (error) {
            if (error instanceof AxiosError) {
                throwError(error.response?.data.error.message, 'Training error');
            }
        }
    }

    const buttonLabel: Record<string, React.ReactNode> = {
        'untrained': <span>Initiate training</span>,
        'feedback': <span>Continue training</span>,
        'completed': null,
    };

    return (
        <div className={ classes.container }>
            <form className={ classes.contentContainer } onSubmit={ initiateSubmission }>
                <div className={ classes.titleBar }>
                    <h1>Dataset training</h1>
                    <Button type={ 'submit' } className={ classes.utilityButton } gradient={ true }>
                        {buttonLabel[props.dataset.state]}
                        <RxArrowRight className={ classes.icon }></RxArrowRight>
                    </Button>
                </div>
                {props.dataset.state === 'untrained' ? (
                    <div className={ classes.formInputs }>
                        <div className={ classes.labelledInputContainer }>
                            <span className={ classes.labelledInputContainer__label }>Search Queries</span>
                            <ul className={ trainingClasses.trainingQueriesInputs }>
                                {props.dataset.classes.map(function generateSearchQueryInput(classString, index) {
                                    const id = v4();
                                    return (
                                        <React.Fragment key={ index }>
                                            <TrainingLabels htmlFor={ id }
                                                            labelColor={ LABEL_COLORS[index] }>{classString}</TrainingLabels>
                                            <CustomCreatableSelect name={ `searchQuery_${index}` } instanceId={ id }
                                                                   isMulti={ true }
                                                                   className={ trainingClasses.querySelect }></CustomCreatableSelect>
                                        </React.Fragment>
                                    );
                                })}
                            </ul>
                        </div>

                        <label className={ classes.labelledInputContainer }>
                            <span className={ classes.labelledInputContainer__label }>Output Quantity</span>
                            <input type="number" id={ 'desired_data' } name={ 'desired_data' } min={ 1 } max={ 10000 }
                                   defaultValue={ 30 }
                                   className={ classes.outputQuantity }/>
                        </label>

                    </div>
                ) : <></>}
            </form>
        </div>
    );
}
