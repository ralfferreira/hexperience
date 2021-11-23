import React from 'react';
import { Container, Content, Touchable, BugsList, Bug, BugHeader, BugTitle, BugId, BugDescription, BugFooter, BugProfileView, BugProfile, BugName, BugDate } from './styles';
import Luffy from '../../assets/img/luffy.jpg';
const AdminReportedBugs = () => {
  return (
    <Container>
        <BugsList>
          <Touchable>
            <Bug>
              <BugHeader>
                <BugTitle numberOfLines={2}>Problemas no touchscreen e em tudo, ta travando geral, preciso de ajuda pelo amor de Deus</BugTitle>
                <BugId numberOfLines={1}>#322</BugId>
              </BugHeader>
              <BugDescription numberOfLines={6}>A função "Tap to wake", que permite "acordar" o celular com um toque na tela, está funcionando de maneira intermitente com alguns usuários do iPhone 13 (versões mini, padrão e Pro). Além do recurso, o próprio touchscreen não tem sido tão responsivo, de acordo com publicações no Twitter e Reddit.</BugDescription>
              <BugFooter>
                <BugProfileView>
                  <BugProfile source={Luffy} />
                  <BugName numberOfLines={1}>Monkey D. Luffy Teste Teste Teste</BugName>
                </BugProfileView>
                <BugDate>23/11/2021</BugDate>
              </BugFooter>
            </Bug>
          </Touchable>
          <Touchable>
            <Bug>
              <BugHeader>
                <BugTitle numberOfLines={2}>Problemas no touchscreen e em tudo, ta travando geral, preciso de ajuda pelo amor de Deus</BugTitle>
                <BugId numberOfLines={1}>#322</BugId>
              </BugHeader>
              <BugDescription numberOfLines={6}>A função "Tap to wake", que permite "acordar" o celular com um toque na tela, está funcionando de maneira intermitente com alguns usuários do iPhone 13 (versões mini, padrão e Pro). Além do recurso, o próprio touchscreen não tem sido tão responsivo, de acordo com publicações no Twitter e Reddit.</BugDescription>
              <BugFooter>
                <BugProfileView>
                  <BugProfile source={Luffy} />
                  <BugName numberOfLines={1}>Monkey D. Luffy Teste Teste Teste</BugName>
                </BugProfileView>
                <BugDate>23/11/2021</BugDate>
              </BugFooter>
            </Bug>
          </Touchable>
          <Touchable>
            <Bug>
              <BugHeader>
                <BugTitle numberOfLines={2}>Problemas no touchscreen e em tudo, ta travando geral, preciso de ajuda pelo amor de Deus</BugTitle>
                <BugId numberOfLines={1}>#322</BugId>
              </BugHeader>
              <BugDescription numberOfLines={6}>A função "Tap to wake", que permite "acordar" o celular com um toque na tela, está funcionando de maneira intermitente com alguns usuários do iPhone 13 (versões mini, padrão e Pro). Além do recurso, o próprio touchscreen não tem sido tão responsivo, de acordo com publicações no Twitter e Reddit.</BugDescription>
              <BugFooter>
                <BugProfileView>
                  <BugProfile source={Luffy} />
                  <BugName numberOfLines={1}>Monkey D. Luffy Teste Teste Teste</BugName>
                </BugProfileView>
                <BugDate>23/11/2021</BugDate>
              </BugFooter>
            </Bug>
          </Touchable>
          <Touchable>
            <Bug>
              <BugHeader>
                <BugTitle numberOfLines={2}>Problemas no touchscreen e em tudo, ta travando geral, preciso de ajuda pelo amor de Deus</BugTitle>
                <BugId numberOfLines={1}>#322</BugId>
              </BugHeader>
              <BugDescription numberOfLines={6}>A função "Tap to wake", que permite "acordar" o celular com um toque na tela, está funcionando de maneira intermitente com alguns usuários do iPhone 13 (versões mini, padrão e Pro). Além do recurso, o próprio touchscreen não tem sido tão responsivo, de acordo com publicações no Twitter e Reddit.</BugDescription>
              <BugFooter>
                <BugProfileView>
                  <BugProfile source={Luffy} />
                  <BugName numberOfLines={1}>Monkey D. Luffy Teste Teste Teste</BugName>
                </BugProfileView>
                <BugDate>23/11/2021</BugDate>
              </BugFooter>
            </Bug>
          </Touchable>
          <Touchable>
            <Bug>
              <BugHeader>
                <BugTitle numberOfLines={2}>Problemas no touchscreen e em tudo, ta travando geral, preciso de ajuda pelo amor de Deus</BugTitle>
                <BugId numberOfLines={1}>#322</BugId>
              </BugHeader>
              <BugDescription numberOfLines={6}>A função "Tap to wake", que permite "acordar" o celular com um toque na tela, está funcionando de maneira intermitente com alguns usuários do iPhone 13 (versões mini, padrão e Pro). Além do recurso, o próprio touchscreen não tem sido tão responsivo, de acordo com publicações no Twitter e Reddit.</BugDescription>
              <BugFooter>
                <BugProfileView>
                  <BugProfile source={Luffy} />
                  <BugName numberOfLines={1}>Monkey D. Luffy Teste Teste Teste</BugName>
                </BugProfileView>
                <BugDate>23/11/2021</BugDate>
              </BugFooter>
            </Bug>
          </Touchable>
        </BugsList>
    </Container>
  );
};

export default AdminReportedBugs;
