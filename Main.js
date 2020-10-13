import React,{Component} from 'react';
import {View, Button, Text, StyleSheet, ScrollView, Alert} from 'react-native';

export default class Main extends Component{

    constructor(){
        super();// constructor 생성자는 super()필수!

        this.state={
            text:"",
            movies:[],
        };
    }

    render(){
        return(

            <View style={styles.root}>
                <View>
                    <Button title="fetch data from network" onPress={()=>{this.fetchData()}}></Button>
                </View>

                {/* View 안에 ScrollView를 넣으면 ScrollView안의 데이터만큼의 크기를 가질 수 있다. */}
                <View>
                    {/* ScrollView는 기본으로 flex:1을 갖고있다. */}
                    <ScrollView style={styles.scroll}>
                        <Text style={styles.text}>{this.state.text}</Text>

                        {/* 영화정보를 가진 배열 데이터 출력 */}
                        {/* 원래는 FlatList 컴포넌트 사용 : 숙제 => import해야함 */}
                        {
                            this.state.movies.map((element, index)=>{
                                return(
                                    <View key={index} style={styles.item}>
                                        <Text>{element.id}</Text>
                                        <Text>{element.title}</Text>
                                        <Text>{element.releaseYear}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>

                
            </View>
            
        );// return....
    }// render method....

    fetchData=()=>{
        // row버튼 클릭하면 나오는 진짜 주소를 복사
        // https://raw.githubusercontent.com/wjsthd10/ReactNative_test/master/test02.txt

        // 1. JavaScript의 XMLHttpRequest객체 사용하기
        // let xhr=new XMLHttpRequest();

        // // 비동기방식으로 진행하면 네트워크 작업을하는동안 데이터를 받아오기 전에 화면에 데이터를 표시하기 때문에 아무것도 표기되지 않는다.
        // xhr.onreadystatechange=()=>{// onreadystatechange는 응답을 4번해준다. [0:데이터받음, 1:작업시작, 2:작업완료, 3:작업완료리턴한다. 4:작업을 종료함]
        //     if(xhr.readyState==4 && xhr.status==200) this.setState({text:xhr.responseText});
        //     // let data=xhr.responseText; // data라는 변수를 따로 만들어서 작성할 경우
        // }// send()보다 먼저 실행해야 에러가 없다.

        // xhr.open("GET","https:raw.githubusercontent.com/wjsthd10/ReactNative_test/master/test02.txt",true);
        // xhr.send();
        // 코드의 진행순서를 알아보기 힘들고 콜백메소드가 중첩되어 구분하기 어려움

        // 2. Fetch 라이브러리 - JS의 기본 통신 라이브러리로 지정됨
        // fetch()함수 : Jquery ajax()와 같은 역할
        // fetch('https://raw.githubusercontent.com/wjsthd10/ReactNative_test/master/README.md')
        // .then((response)=>{
        //     kkk();
        //     // Alert.alert(response.status+"");
        //     // 받아온 데이터를 json으로 볼지 String으로 볼지 지정

        //     // 1) response객체가 받은 데이터를 문자열로 변환
        //     return response.text();    // 결과를 text로 변환하지만 이 처리도 비동기 방식으로 처리한다.
            
        // }).then((responseText)=>{
        //     this.setState({text:responseText});
        // }).catch((m)=>{Alert.alert('에러'+m)});

        // 축약본
        // fetch('https://raw.githubusercontent.com/wjsthd10/ReactNative_test/master/test02.txt')// url주소도 따로 변수로 생성하면 더 짧아진다.
        // .then(response=>response.text()).then(responseText=>this.setState({text:responseText})).catch(m=>Alert.alert('에러'+m))

        // 3. JSON 파싱 [ OPEN API 사용 ]
        // fetch('https://reactnative.dev/movies.json')
        // .then((response)=>response.json())// 내려받은 데이터 json문자열 -> 객체로 변환
        // .then((jsonObj)=>{
        //     this.setState({text:jsonObj.title, movies:jsonObj.movies});
        // });


        // 4. GET Method로 데이터 보내고 응답받기....
        // 보낼 데이터 작성
        let name="sam";
        let msg="Hello sam";

        // // GET방식은 특별하지 않음 URL뒤에 보낼 데이터 붙이면 끝임
        // // const url=`http://wjsthd10.dothome.co.kr/ReactNative/getMethod.php?name=${name}&msg=${msg}`;
        // // fetch(url)
        // // .then(res=>res.text())
        // // .then(resText=>this.setState({text:resText}))

        // // POST방식
        // let data="name="+name+"&"+"msg="+msg;
        // const url='http://wjsthd10.dothome.co.kr/ReactNative/postMethod.php';
        // fetch(url,{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'applicattion/x-www-form-urlencoded'
        //     },
        //     body:data,
        // })
        // .then(res=>res.text())
        // .then(resText=>this.setState({text:resText}));

        // JSON방식으로 서버에 데이터 전달하기
        // 보낼 데이터가 변수로 있는 경우보다는 객체로 있는 경우가 많음
        let dataObj={
            name:'sam',
            msg:'Hello world',
            age:20
        };

        // 위 객체르 json문자열로 변환
        const jsonData=JSON.stringify(dataObj);// 객체를 JSON문자열로 변환
        // Alert.alert(jsonData);

        const url='http://wjsthd10.dothome.co.kr/ReactNative/jsonRequest.php';
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:jsonData,
        })
        .then(res=>res.json())
        .then(jsonObj=>{
            let aaa=jsonObj.name+", "+jsonObj.age+", "+jsonObj.msg;
            this.setState({text:aaa})
        });
        

    }
}// Main class....

const styles=StyleSheet.create({
    root:{
        backgroundColor:'#44558866',
        padding:16,
        flex:1
    },
    scroll:{
        marginTop:16,
        backgroundColor:'gray',

    },
    text:{
        padding:16,
        color:'white',
        fontSize:20,
        fontWeight:"bold"
    },
    item:{
        flexDirection:"row",
        margin:4,
        borderWidth:2
    }
})