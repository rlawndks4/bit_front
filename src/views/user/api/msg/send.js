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
    ['sender', '발신자 전화번호 (최대 16bytes)', 'O', 'String'],
    ['receiver', '수신자 전화번호 - 컴마(,)분기 입력으로 최대 1천명', 'O', 'String'],
    ['msg', '메시지 내용', 'O', 'String (1~2,000Byte)'],
    ['title', '메시지 제목 (LMS, MMS 에서 사용가능)', 'X', 'String (1~2,000Byte)'],
    ['image1', '첨부이미지', 'X', 'JPEG,PNG,GIF'],
    ['image2', '첨부이미지', 'X', 'JPEG,PNG,GIF'],
    ['image3', '첨부이미지', 'X', 'JPEG,PNG,GIF'],
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
const MsgSend = (props) => {
    return (
        <>
            <Title2 style={{ margin: '1rem 0' }}>문자보내기</Title2>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                동일한 내용의 문자를 컴마(,)로 분기하여 동시 1천명에게 전송하실 수 있습니다.<br />
                발신번호는 사이트내에서 미리 등록된 번호만 사용하실 수 있습니다.<br />
                msg_type을 지정하지 않으시면 90byte를 초과하는 메시지 발송 시 LMS(첨부파일 없는 MMS) 형태로 자동 전환됩니다.<br />
                (단, 시스템별 개행문자등의 Byte가 다를 수 있으므로 전송전 90Byte 체크를 하여 msg_type을 지정하시는것을 권장합니다.)<br />
            </Title3>
            <Title3>
                [ Request ]
            </Title3>
            <Col style={{ padding: '2rem', background: '#222', rowGap: '0.5rem' }}>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>POST</div>
                    <div style={{ color: 'yellow' }}>/api/msg/v1/send</div>
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
export default MsgSend;