import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Col, Row, Title2, Title3 } from "src/components/elements/styled-components";

const req_table_head = [
    '키',
    '설명',
    '필수',
    '타입',
];
const req_table_body = [
    ['api_key', '인증용 API Key', 'O', 'String'],
    ['user_id', '사용자id', 'O', 'String'],
    ['token', '생성한 토큰', 'O', 'String'],
    ['sender', '발신자 전화번호 (최대 16bytes)', 'O', 'String'],
    ['receiver_1 (1 ~ 500)', '수신자 연락처', 'O', 'String'],
    ['recvname_1 (1 ~ 500)', '수신자 이름', 'X', 'String'],
    ['subject_1 (1 ~ 500)', '알림톡 제목', 'O', 'String'],
    ['message_1 (1 ~ 500)', '알림톡 내용', 'O', 'String'],
    ['emtitle_1 (1 ~ 500)', '강조표기형의 타이틀', 'X', 'String'],
    ['button_1 (1 ~ 500)', '버튼 정보', 'X', 'String'],
    ['failover', '실패시 대체문자 전송기능', 'X', 'String'],
    ['fsubject_1 (1 ~ 500)', '실패시 대체문자 제목', 'X', 'String'],
    ['fmessage_1 (1 ~ 500)', '실패시 대체문자 내용', 'X', 'String'],
]
const res_table_head = [
    '키',
    '설명',
    '타입',
];
const res_table_body = [
    ['code', '결과코드(API 수신유무)', 'Integer'],
    ['message', '결과 메시지( code 가 0 보다 작은경우 실패사유 표기)', 'String'],
    ['data', '리턴값', 'Array'],
]
const AlimtalkSend = (props) => {
    return (
        <>
            <Title2 style={{ margin: '1rem 0' }}>알림톡 전송</Title2>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
            알림톡 전송을 요청합니다. 템플릿 서식과 일치하지 않을경우 전송되지 않습니다.
            </Title3>
            <Title3>
                [ Request ]
            </Title3>
            <Col style={{ padding: '2rem', background: '#222', rowGap: '0.5rem' }}>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>POST</div>
                    <div style={{ color: 'yellow' }}>/api/alimtalk/v1/send</div>
                    <div style={{ color: '#fff' }}>HTTP/1.1</div>
                </Row>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>Host:</div>
                    <div style={{ color: 'orange' }}>{process.env.API_URL}</div>
                </Row>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>Service Port:</div>
                    <div style={{ color: 'orange' }}>443</div>
                </Row>
            </Col>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                HTTPS 프로토콜을 사용하여 POST로 요청합니다. 예약설정을 통해 예약문자로 등록이 가능하며, 파일첨부를 통해 MMS 전송이 가능합니다.
            </Title3>
            <Table style={{ border: '1px solid #ccc' }}>
                <TableHead>
                    <TableRow sx={{ padding: '1rem 0' }}>
                        {req_table_head.map(text => (
                            <>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {text}
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {req_table_body.map(col => (
                        <>
                            <TableRow sx={{ padding: '1rem 0' }}>
                                {col && col.map(row => (
                                    <>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {row}
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
            <Title3>
                [ Response ]
            </Title3>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                응답 바디는 JSON 객체로 구성됩니다.
            </Title3>
            <Table style={{ border: '1px solid #ccc' }}>
                <TableHead>
                    <TableRow sx={{ padding: '1rem 0' }}>
                        {res_table_head.map(text => (
                            <>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {text}
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res_table_body.map(col => (
                        <>
                            <TableRow sx={{ padding: '1rem 0' }}>
                                {col && col.map(row => (
                                    <>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {row}
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
export default AlimtalkSend;