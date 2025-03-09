import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { COLORS } from '../../styles/style';
import { CattleDTO } from '../../dtos/CattleDTO';
import { tagStatusColors, tagStatusTexts } from '../../enums/CattleTagStatusEnum';
import syncScreenStyles from './SyncScreen.styles';

type RootStackParamList = {
  TagSync: { cattle: CattleDTO };
};

type SyncScreenRouteProp = RouteProp<RootStackParamList, 'TagSync'>;

const SyncScreen: React.FC = () => {
  const route = useRoute<SyncScreenRouteProp>();
  const { cattle } = route.params;
  const [isConnecting, setIsConnecting] = useState(false);
  const rotateAnim = useState(new Animated.Value(0))[0];

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotateAnim.stopAnimation();
    rotateAnim.setValue(0);
  };

  const handleConnect = () => {
    if (isConnecting) {
      stopRotation();
    } else {
      startRotation();
    }
    setIsConnecting(!isConnecting);
  };

  return (
    <View style={syncScreenStyles.container}>
      <Text style={syncScreenStyles.title}>{cattle.name}</Text>
      <View style={[syncScreenStyles.tagStatusBadge, { backgroundColor: tagStatusColors[cattle.tag_status] }]}>
        <Text style={syncScreenStyles.tagStatusText}>{tagStatusTexts[cattle.tag_status]}</Text>
      </View>

      <TouchableOpacity onPress={handleConnect} style={syncScreenStyles.connectButton} activeOpacity={0.8}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <Icon name="sync" size={70} color={COLORS.primary} />
        </Animated.View>
      </TouchableOpacity>

      <Text style={syncScreenStyles.connectButtonText}>
        {isConnecting ? 'Sincronizando...' : 'Conectar'}
      </Text>
    </View>
  );
};

export default SyncScreen;
