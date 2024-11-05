import {
  Wrapper,
  MapArea,
  BookmarkBtnArea,
  ContentArea,
  TitleArea,
  TitleText,
  DetailInfoArea,
  DetailInfoView,
  LineInfoView,
  LineInfoText,
  BtnArea,
} from "./MarathonInfoDetailScreenStyles"
import { useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import BookmarkBtn from "../../components/Button/BookmarkBtn/BookmarkBtn";
import MarathonInfoDetailIcon from "../../components/MarathonInfoDetailIcon/MarathonInfoDetailIcon";
import RoundBtn from "../../components/Button/RoundBtn/RoundBtn"
import SelectModal from "../../components/Modal/SelectModal/SelectModal";

import { Text, Image, ScrollView } from "react-native";
import testImg from "./../../assets/images/testProfile2.jpg"

const testMarathonInfo = {
  name: '2024 국제 국민 마라톤',
  date: '2024.10.03',
  period: '2024.09.20~2024.09.25',
  place: '여의도 공원 문화의 마당',
  url: 'http://국민마라톤.com',
  course: ['하프', '10km', '3.6km'],
  host: '무안군체육회, 전국 마라톤 협회',
  callNum: '061.0000.0000'
}

const MarathonInfoDetailScreen = ({navigation}) => {
  const [marathonName, setMarathonName] = useState('')
  const [marathonDate, setMarathonDate] = useState('')
  const [marathonPeriod, setMarathonPeriod] = useState('')
  const [marathonPlace, setMarathonPlace] = useState('')
  const [marathonUrl, setMarathonUrl] = useState('')
  const [marathonCourse, setMarathonCourse] = useState([])
  const [marathonHost, setMarathonHost] = useState('')
  const [marathonCallNum, setMarathonCallNum] = useState('')

  useEffect(() => {
    setMarathonName(testMarathonInfo.name)
    setMarathonDate(testMarathonInfo.date)
    setMarathonPeriod(testMarathonInfo.period)
    setMarathonPlace(testMarathonInfo.place)
    setMarathonUrl(testMarathonInfo.url)
    setMarathonCourse(testMarathonInfo.course)
    setMarathonHost(testMarathonInfo.host)
    setMarathonCallNum(testMarathonInfo.callNum)
  }, [])

  return (
    <Wrapper>
      <ScrollView>

        {/* 지도 영역 */}
        <MapArea>
          <Image 
            // style={{height: '100%'}}
          source={testImg} />
          <BookmarkBtnArea>
            <BookmarkBtn text={'경로 북마크'} />
          </BookmarkBtnArea>
        </MapArea>

        <ContentArea>
          <TitleArea>
            {marathonName&&
              <TitleText>{marathonName}</TitleText>
            }
          </TitleArea>
          <DetailInfoArea>
            <DetailInfoView>

              {marathonDate&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'date'} />
                  <LineInfoText>대회 일시: {marathonDate}</LineInfoText> 
                </LineInfoView>
              }
              {marathonPeriod&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'period'} />
                  <LineInfoText>접수 기간: {marathonPeriod}</LineInfoText> 
                </LineInfoView>
              }
              {marathonPlace&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'location'} />
                  <LineInfoText>대회 장소: {marathonPlace}</LineInfoText> 
                </LineInfoView>
              }
              {marathonUrl&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'url'} />
                  <LineInfoText>홈페이지: {marathonUrl}</LineInfoText> 
                </LineInfoView>
              }
              {marathonCourse&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'course'} />
                  <LineInfoText>대회 종목: {marathonCourse}</LineInfoText> 
                </LineInfoView>
              }
              {marathonHost&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'host'} />
                  <LineInfoText>주최: {marathonHost}</LineInfoText> 
                </LineInfoView>
              }
              {marathonCallNum&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'callNum'} />
                  <LineInfoText>문의: {marathonCallNum}</LineInfoText> 
                </LineInfoView>
              }
              {/* {marathonCallNum&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'callNum'} />
                  <LineInfoText>문의: {marathonCallNum}</LineInfoText> 
                </LineInfoView>
              }
              {marathonCallNum&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'callNum'} />
                  <LineInfoText>문의: {marathonCallNum}</LineInfoText> 
                </LineInfoView>
              }
              {marathonCallNum&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'callNum'} />
                  <LineInfoText>문의: {marathonCallNum}</LineInfoText> 
                </LineInfoView>
              }
              {marathonCallNum&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'callNum'} />
                  <LineInfoText>문의: {marathonCallNum}</LineInfoText> 
                </LineInfoView>
              }
              {marathonCallNum&&
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={'callNum'} />
                  <LineInfoText>문의: {marathonCallNum}</LineInfoText> 
                </LineInfoView>
              } */}
              <BtnArea>
                <RoundBtn text={'참가 신청하기'}/>
              </BtnArea>
            </DetailInfoView>
          </DetailInfoArea>
        </ContentArea>
      </ScrollView>
      {
        <SelectModal />
      }
    </Wrapper>
  )
}

export default MarathonInfoDetailScreen;