import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, pure, mapProps} from 'recompose';
import { graphql } from 'react-apollo';
import * as actions from '../../actions/effectsRigActions';
import { effectState } from '../../client/sessionSchemas';
import { getTrack, getTrackEffects, getSelectedEffect, sessionIdSelector } from '../../reducers';
import { subscribeToEffectAdded } from '../../client/subscriptions';
import { EffectsUnit } from '../organisms';

class EffectsRig extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.addEffect = this.addEffect.bind(this);
        this.changeSetting = this.changeSetting.bind(this);
    }

    componentWillMount() {
        const subscribeToMore = this.props.subscribeToMore;
        this.props.subscribeToEffectAdded(this.props.actions.getSingleEffect, subscribeToMore);
    }

    componentDidMount() {
        this.props.actions.getAllEffects(this.props.sessionId);
    }

    addEffect(e) {
        this.props.actions.addEffectToChain(
            this.props.sessionId,
            this.props.track.id,
            8,
            e.target.value
        );
    }

    changeSetting(e) {

    }

    render(){
        return (
            <div>
                <p>Track No: {this.props.track.id}</p>
                <p>Add an effect:</p>
                {this.props.effectsSuite.map((effect, index) => (
                    <button onClick={this.addEffect} 
                        value={effect.name}
                        key={'addEffect' + index}>
                            {effect.name}
                    </button>
                ))}

                <div>
                    This track's added effects:
                    {this.props.effectsEntries.map((entry, index) => (
                        <button key={'effectEntry' + index}
                            data-track-id={entry.trackId}
                            onClick={this.props.actions.effectSelectedForEdit}  
                            value={entry.id}>
                                {entry.type}
                        </button>
                    ))}
                </div>

                <EffectsUnit effectId={this.props.selectedEffect.id}
                    allSettings={this.props.selectedEffect.settings} 
                    type={this.props.selectedEffect.type}
                    isOn={this.props.selectedEffect.isOn} 
                    changeSetting={this.changeSetting} />
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        sessionId: sessionIdSelector(state),
        track: getTrack(state),
        effectsSuite: state.effectsRig.effectsSuite,
        effectsEntries: getTrackEffects(state),
        selectedEffect: getSelectedEffect(state)
    };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(effectState),
  mapProps(({data, ...props}) => ({
    subscribeToMore: data && data.subscribeToMore,
    subscribeToEffectAdded,
    ...props
  })),
  pure
)(EffectsRig);