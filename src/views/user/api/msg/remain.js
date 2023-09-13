import { Col, Row, Title2, Title3 } from "src/components/elements/styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const req_table_head = [
    '키',
    '설명',
    '필수',
    '타입',
];
const req_table_body = [

]
const res_table_head = [
    '키',
    '설명',
    '타입',
];
const res_table_body = [

]
const MsgRemain = (props) => {
    return (
        <>
            <Title2 style={{ margin: '1rem 0' }}>발송가능건수</Title2>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                보유한 잔여포인트로 발송가능한 잔여건수를 문자구분(유형)별로 조회하실 수 있습니다.<br/>
                SMS, LMS, MMS로 발송시 가능한 잔여건수이며 남은 충전금을 문자유형별로 보냈을 경우 가능한 잔여건입니다.<br/>
                예를들어 SMS_CNT : 11 , LMS_CNT : 4 인 경우 단문전송시 11건이 가능하고, 장문으로 전송시 4건이 가능합니다.<br/>
            </Title3>
            <Title3>
                [ Request ]
            </Title3>
            <Col style={{ padding: '2rem', background: '#222', rowGap: '0.5rem' }}>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>POST</div>
                    <div style={{ color: 'yellow' }}>/api/msg/v1/remain</div>
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
export default MsgRemain;