import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import { 
  Container, 
  Touchable, 
  BugsList, 
  Bug, 
  BugHeader, 
  BugTitle, 
  BugId, 
  BugDescription, 
  BugFooter, 
  BugDate 
} from './styles';

const AdminReportedBugs = () => {
  const [reportedBugs, setReportedBugs] = useState([]);

  const getReportedBugs = useCallback(async () => {
    try {
      const response = await api.get('/admin/bugs');

      setReportedBugs(response.data);
    } catch (err) {
      Alert.alert('Erro ao carregar bugs', `${err.response.data.message}`)
    }
  }, [])

  useEffect(() => {
    getReportedBugs().finally(() => {});
  }, []);

  const handleSolveBug = useCallback((id) => {
    api.patch(`/admin/bugs/${id}`, {
      resolved: true
    }).then(() => {
      Alert.alert('Sucesso', 'Bug atualizado com sucesso!');
      getReportedBugs().finally(() => {});
    }).catch((err) => {
      Alert.alert('Erro ao atualizar bug', `${err.response.data.message}`)
    })
  }, [])

  const ensureSolveBug = useCallback((id) => {
    Alert.alert(
      'Resolver Bug',
      'Tem certeza que deseja marcar esse bug como resolvido?',
      [
        {
          text: 'Cancelar', style: 'cancel', onPress: () => {}
        },
        {
          text: 'Marcar como resolvido',
          style: 'default',
          onPress: () => handleSolveBug(id)
        }
      ]
    )
  }, [handleSolveBug]);

  return (
    <Container>
      <BugsList>
        {
          reportedBugs.length
          ? reportedBugs.map(entry => {
            const parsedDate = parseISO(entry.createdAt);

            const formattedDate = format(parsedDate, 'dd/MM/yyyy');

            return (
              <Touchable
                key={`Touchable:${entry._id}`}
                onPress={() => ensureSolveBug(entry._id)}
              >
                <Bug key={`Bug:${entry._id}`}>
                  <BugHeader key={`Header:${entry._id}`}>
                    <BugTitle 
                      key={`Title:${entry._id}`}
                      numberOfLines={2}                      
                    >
                      {entry.what}
                    </BugTitle>
                    <BugId 
                      key={`Id:${entry._id}`}
                      numberOfLines={1}
                    >
                      {entry.where}
                    </BugId>
                  </BugHeader>
                  <BugDescription 
                    key={`Decription:${entry._id}`}
                    numberOfLines={6}
                  >
                    {entry.description}
                  </BugDescription>
                  <BugFooter key={`Footer:${entry._id}`} >
                    <BugDate key={`Date:${entry._id}`}>{formattedDate}</BugDate>
                  </BugFooter>
                </Bug>
              </Touchable>
            )
          })
          : (<></>)
        }
      </BugsList>
    </Container>
  );
};

export default AdminReportedBugs;
