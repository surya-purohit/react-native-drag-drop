import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
	createAutoscrollable,
	createDragArena,
	createDragContext,
	createDragShadow,
	createDropZone,
} from 'react-native-drag-drop';
import cardImages  from "./cardImages";

const {
	Animated,
	AppRegistry,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	PanResponder,
	Dimension,
	Image
} = ReactNative;
import Zone from './Zone';

class DragShad extends Component {
	render() {
		return (
			<Animated.View style={[styles.dragShadow, this.props.style]}>
				<Image style={{flex: 1, borderRadius: 10, resizeMode: "contain"}} source={cardImages[this.props.dragItem.id]} />
			</Animated.View>
		);
	}
}
const DragShadow = createDragShadow(DragShad);
class DragArena  extends Component {
	constructor() {
		super();
		this.zonesObject = {
							"P1-R1-Z": {"length": 3},
							"P1-R2-Z": {"length": 5},
							"P1-R3-Z": {"length": 5},
							"VR-Z": {"length": 5}
						};
		this.state = {
			card : {
						"VR-Z": [{"id": "2C", "url": "Ace_clover.png", "zoneId": "VR-Z"},
								{"id": "3C", "url": "Jack_clover.png", "zoneId": "VR-Z"},
								{"id": "KD", "url": "Queen_diamond.png", "zoneId": "VR-Z"},
								{"id": "3D", "url": "king_hearts_01.png", "zoneId": "VR-Z"},
								{"id": "QH", "url": "hearts_02_0001_Group-1-copy-7.png", "zoneId": "VR-Z"},
								{"id": "JH", "url": "Ace_clover.png", "zoneId": "VR-Z"},
								{"id": "TS", "url": "Jack_clover.png", "zoneId": "VR-Z"},
								{"id": "KS", "url": "Queen_diamond.png", "zoneId": "VR-Z"},
								{"id": "4C", "url": "king_hearts_01.png", "zoneId": "VR-Z"},
								{"id": "AD", "url": "hearts_02_0001_Group-1-copy-7.png", "zoneId": "VR-Z"},
								{"id": "7S", "url": "Jack_clover.png", "zoneId": "VR-Z"},
								{"id": "6S", "url": "Queen_diamond.png", "zoneId": "VR-Z"},
								{"id": "5C", "url": "king_hearts_01.png", "zoneId": "VR-Z"},
								{"id": "KC", "url": "hearts_02_0001_Group-1-copy-7.png", "zoneId": "VR-Z"}],
						"P1-R1-Z": [],
						"P1-R2-Z": [],
						"P1-R3-Z": []
					}
		}
		this.ondrop = this.ondrop.bind(this);
		for (var zn in this.zonesObject) {
			this.zonesObject[zn].component = createDropZone(Zone, zn);
		}
	}
	ondrop(props, state, panReleased) {
		if(state.dragItem) {
			if(props){
				this.setState((stt)=>{
					var item = {...state.dragItem};
					var zoneId = item.zoneId;
					if(state.currentDropZone && this.zonesObject[state.currentDropZone].length > stt.card[state.currentDropZone].length) {
						state.dragItem.zoneId = state.currentDropZone ? state.currentDropZone : state.dragItem.zoneId;
						stt.card[zoneId] = stt.card[zoneId].filter((item)=> {
							return item.old_card ? false : true;
						})
						stt.card[state.currentDropZone].push(state.dragItem);
					} else {
						stt.card[zoneId] = stt.card[zoneId].map((item) => {
							return item.old_card ? item.old_card : item;
						})
					}
					return stt;
				})
			} else if (panReleased) {
				this.setState((stt)=>{
			return stt;
				})
			} else {
				this.settSate((stt)=>{
					var item = {...state.dragItem};
					var zoneId = item.zoneId;
					stt.card[zoneId] = stt.card[zoneId].map((it) => {
						if(it.id != state.dragItem.id) {
							return it;
						} else {
							return {
								id: "NA",
								zoneId: it.zoneId,
								old_card: it,
								url: ""
								};
						}
					})
					return stt;
				})
			}
		}
	}
	render() {
		const { startDragHandler, scrollEnabled, stopDrag, currentDropZone } = this.props; // Injected by createDragArena()
		const renderZones = (Zn, zoneName, i) => {
			return (<Zn.component startDragHandler={startDragHandler} data={{"item": this.state.card[zoneName], "length": Zn.length, "zoneName": zoneName}} stopDrag={stopDrag} ondrop = {this.ondrop} key={i} currentDropZone={currentDropZone}/>)
		}
		return (
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<View style={{flex: 4}}></View>{Object.keys(this.zonesObject).map((zone, i) => {
						return renderZones(this.zonesObject[zone], zone, i);
					})}
				</View>
			</View>
		);
	}
}

export default Viewport = createDragArena(DragArena, DragShadow, 'x');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	subContainer: {
		flex: 1,
	},
	draggableThing: {
		margin: 10,
		backgroundColor: "red"
	},
	draggableThingChild: {
		flex: 1
	},
	dragShadow: {
		position: 'absolute', // Don't forget to add position: absolute because position styles are calculated.
		height: 30,
		margin: 10,
		width: 20,
		justifyContent: "center",
		alignItems: "center",
		height: 30,
		margin: 10
	},
	redDropZone: {
		backgroundColor: 'red',
	},
	blueDropZone: {
		backgroundColor: 'lightblue',
	}
});