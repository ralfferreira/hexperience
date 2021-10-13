import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 20px;
    height: 100%;
    background: #fff;
`;
export const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const Title = styled.Text`
    font-weight: bold;
    font-size: 22px;
    margin-top: 15px;
    margin-bottom: 15px;
`
export const SeeAll = styled.Text`
    font-size: 14px;
    margin-top: 20px;
`
export const Categories = styled.ScrollView`
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    padding-bottom: 10px;
`
export const Experiences = styled.ScrollView`
    margin-top: 10px;
    height: 330px;
`
export const Hosts = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const HostPhoto = styled.Image`
    width: 75px;
    height: 75px;
    border-radius: 50px;
`
export const HostProfile = styled.TouchableOpacity``