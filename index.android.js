import React, { Component } from 'react';
import ReactNative from 'react-native';
const { View,Text } = ReactNative;
import Viewport from './app/Viewport';
import Swiper from 'react-native-swiper';

class Scene extends Component {
	constructor(props) {
		super();
		this.state = {
			scrollEnabled: true
		};
	}

	setScrollForSwiper (bool) {
		this.setState({
			scrollEnabled: bool
		});
	}
	render () {
		let arr  = [0, 1, 2, 3, 4];
		return (
			<Swiper style={{flex: 1}} scrollEnabled={this.state.scrollEnabled}>
			{
				arr.map((item, i) => {
					return (
						<View style={{flex: 1}} key={i}>
							<View style={{flex: 1}} ></View>
							<Viewport style={{flex: 1}}
								setScrollForSwiper={this.setScrollForSwiper.bind(this)}
								gameId={i} />
						</View>
					)
				})
			}
			</Swiper>
			)
	}
}

ReactNative.AppRegistry.registerComponent('DragAndDrop', () => Scene);