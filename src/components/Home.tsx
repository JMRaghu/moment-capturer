import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Image, McMoments, initMoments, getImages, McAction, SET_IMAGES } from '../actions';
import { McState } from '../reducers';
import ImageComponent from './Image'


interface MapStateToProps {
    categoryTag: string,
    images: McMoments,
    fetchingImages: boolean
}

interface MapDispatchToProps {
    getImages: (categoryTag: string, actionType: string) => Promise<void>
}

interface homeProps extends MapStateToProps, MapDispatchToProps {
}

class Home extends React.Component<homeProps> {

    componentDidMount() {
        console.log('this.props.categoryTag ', this.props.categoryTag);
        this.props.getImages(this.props.categoryTag, SET_IMAGES);
    }

    render() {
        console.log('this.props.images ', this.props.images);
        const biotc = this.props.images.biotc,
            images = this.props.images.moments;
        return (
            <div className="category-home">
                {
                    this.props.fetchingImages &&
                    <div className="fetchingImages">
                        <div className="spinner"></div>
                    </div>
                }
                {
                    !this.props.fetchingImages &&
                    <React.Fragment>
                        {
                            biotc.original.length > 0
                            &&
                            <ImageComponent original={biotc.original}
                                srcSet={biotc.srcSet}
                                description={biotc.description}
                                updateTime={biotc.updateTime}
                                resolution={biotc.resolution}
                                key={biotc.updateTime} />
                        }
                        < div className="images-container">
                            {
                                images.map((image: Image) => {
                                    return <ImageComponent original={image.original}
                                        srcSet={image.srcSet}
                                        panorama={image.panorama}
                                        portrait={image.portrait}
                                        description={image.description}
                                        updateTime={image.updateTime}
                                        resolution={image.resolution}
                                        key={image.updateTime} />
                                })
                            }
                        </div>
                    </React.Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: McState): MapStateToProps => {
    return {
        categoryTag: state.categoryTag || '',
        images: state.images || initMoments,
        fetchingImages: state.fetchingImages || false
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<McState, {}, McAction>): MapDispatchToProps => {
    return {
        getImages: async (categoryTag: string, actionType: string) => {
            await dispatch(getImages(categoryTag, actionType));
        }
    }
}

export default connect<MapStateToProps, MapDispatchToProps>(mapStateToProps, mapDispatchToProps)(Home);
