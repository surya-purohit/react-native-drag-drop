import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
  	createAutoscrollable,
  	createDragArena,
  	createDragContext,
  	createDragShadow,
  	createDropZone,
} from 'react-native-drag-drop';

const {
    Animated,
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} = ReactNative;

const dragContext = createDragContext((props, state) => {
    const dragItem = state.dragItem; // This should probably be passed as the 1st arg to onDrop.
    console.log('This is the onDrop callback. You just dropped a thing!', dragItem);
    // Must return a promise.
    return Promise.resolve();
});

class DraggableThing extends Component {
  	render() {
	  	const { onLayout, onLongPress, item } = this.props;

	    return (
	      	<TouchableHighlight
	        	style={styles.draggableThing}
	        	onLayout={onLayout}
	        	onLongPress={onLongPress}>
	        	<Text>{item}</Text>
	      	</TouchableHighlight>
	    );
  	}
}

class DragShad extends Component {
	render() {
    	return (
      		<Animated.View style={[styles.dragShadow, this.props.style]}>
        		<Text>shadow!</Text>
      		</Animated.View>
    	);
  	}
}
const DragShadow = createDragShadow(DragShad);
class RedDropZo extends Component {
  	render() {
	  	const {
	      	onDragItemLayout, // Injected by createDropZone()
	      	startDragHandler,
	      	red
	    } = this.props;

	    // Note that a 'dragItem' must be an object with at minimum a unique 'id' property.

	    return (
	      	<View style={[styles.redDropZone]}>
	        	{red.map(dragItem => (
	          		<DraggableThing
	            	key={dragItem.id}
	            	onLayout={(e) => onDragItemLayout(dragItem, e)}
	            	onLongPress={() => startDragHandler(dragItem)} item={dragItem.id}><Text>{dragItem.id}</Text></DraggableThing>
	        	))}
	      	</View>
	    );
  	}
}

const RedDropZone = createDropZone(RedDropZo, 'red');

class BlueDropZo  extends Component { 
  	render() {
    	const {
      		onDragItemLayout, // Injected by createDropZone()
      		startDragHandler,
      		blue
    	} = this.props;
	    return (
	      	<View style={[styles.blueDropZone]}>
	        	{blue.map(dragItem => (
	          		<DraggableThing
	            	key={dragItem.id}
	            	onLayout={(e) => onDragItemLayout(dragItem, e)}
	            	onLongPress={() => startDragHandler(dragItem)} item={dragItem.id}></DraggableThing>
	        	))}
	      	</View>
	    );
  	}
}

const BlueDropZone = createDropZone(BlueDropZo, 'blue');

class DragArena  extends Component {
	constructor() {
		super();
		this.state = {
			blue: [
		      	{id: 'bluefoo', type: 'blue'},
		      	{id: 'bluebar', type: 'blue'},
		      	{id: 'bluebaz', type: 'blue'},
		    ],
			red: [
		      	{id: 'redfoo', type: 'red'},
		      	{id: 'redbar', type: 'red'},
		      	{id: 'redbaz', type: 'red'},
		    ]
		}
		this.ondrop = this.ondrop.bind(this)
	}
	ondrop(props,state) {
		if(state.currentDropZone && state.currentDropZone != state.dragItem.type){
  			this.setState((stt)=>{
    		var item = {...state.dragItem};
    		var type = item.type;
    		state.dragItem.type = state.currentDropZone;
    		stt[state.currentDropZone].push(state.dragItem);
    		stt[type] = stt[type].filter((item)=>{
    			return item.id != state.dragItem.id;
    		})
    		return stt;
        	})
        }
	}
	render() {
		const { startDragHandler } = this.props; // Injected by createDragArena()
		return (
		  	<View style={styles.container}>
		    	<RedDropZone startDragHandler={startDragHandler} red={this.state.red}/>
		    	<BlueDropZone startDragHandler={startDragHandler} blue={this.state.blue}/>
		  	</View>
		);
	}
}

export default Viewport = createDragArena(DragArena, DragShadow, dragContext, 'y');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    draggableThing: {
        margin: 10,
    },
    dragShadow: {
        position: 'absolute', // Don't forget to add position: absolute because position styles are calculated.
        backgroundColor: 'green',
    },
    redDropZone: {
        backgroundColor: 'red',
    },
    blueDropZone: {
        backgroundColor: 'lightblue',
    },
});